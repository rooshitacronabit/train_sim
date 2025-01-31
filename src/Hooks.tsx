import * as THREE from 'three';
import {
    ComponentType,
    Dispatch,
    ForwardedRef,
    MutableRefObject,
    PropsWithChildren,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import {useLoader, Vector3} from '@react-three/fiber';
import {RapierRigidBody, useRevoluteJoint} from '@react-three/rapier';
import {MotorModel} from '@dimforge/rapier3d-compat';

import {GlobalContext, GlobalContextProps} from './common';

export function useGlobalContext(): GlobalContextProps {
    return useContext(GlobalContext);
}

export function useCamera(index: number, fixed: boolean) {
    const {setCameras} = useGlobalContext();
    const ref = useRef<THREE.Group>(null);

    useEffect(() => {
        setCameras?.(prev => {
            return [...prev, {ref, fixed, index}].sort((a, b) => a.index - b.index);
        });
        return () => {
            setCameras?.(prev => {
                return prev.filter(c => c.index !== index);
            });
        };
    }, [ref, index, fixed, setCameras]);

    return ref;
}

export type DelayTime = number | (() => number);

export function useTimeout(callback: () => any, delay: DelayTime) {
    const callbackRef = useRef(callback);
    const timeoutRef = useRef(null);
    useEffect(() => {
        callbackRef.current = callback
    }, [callback]);
    const set = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        const delayNum = typeof delay === 'function' ? delay() : delay;
        timeoutRef.current = setTimeout(() => callbackRef.current(), delayNum);
    }, [delay]);
    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []);
    return [set, clear] as [set: () => void, clear: () => void];
}

export function useRefWithCallback<T>(callback: (value: T) => void) {
    const ref = useRef<T>(null);
    const refCb = useCallback((value: T) => {
        ref.current = value;
        callback?.(value);
    }, [callback]);
    return [ref, refCb] as [MutableRefObject<T>, (value: T) => void];
}

export function useInternalRef<T>(ref: ForwardedRef<T>, callback?: (value: T) => void) {
    const refCb = useCallback((value: T) => {
        if (typeof ref === 'function') {
            ref(value);
        } else if (ref) {
            ref.current = value;
        }
        callback?.(value);
    }, [ref, callback]);
    return useRefWithCallback(refCb);
}

export function useLocalState<T>(initialValue: T, key: string) {
    const [state, setState] = useState(() => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, setState] as [T, Dispatch<SetStateAction<T>>];
}

export function useElevationData(path: string, level: number, height: number, segments: number, tiles: number = 1) {
    const img = useLoader(THREE.ImageLoader, path);
    const srcData = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('willReadFrequently', 'true');
        const resolution = Math.floor(segments ?? 128);
        const tileCount = Math.floor(tiles ?? 1);
        const tileSize = Math.floor(resolution / tileCount);
        canvas.width = resolution;
        canvas.height = resolution;
        const context = canvas.getContext('2d');
        const result = [] as Uint8ClampedArray[];
        context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        for (let i = 0; i < tileCount; i++) {
            for (let j = 0; j < tileCount; j++) {
                result.push(context.getImageData(i * tileSize, j * tileSize, tileSize + 1, tileSize + 1).data);
            }
        }
        return result;
    }, [img, segments, tiles]);

    return useMemo(() => {
        const min = level ?? 0;
        const maxHeight = height ?? 50;
        return srcData.map(tileData => {
            const data = new Float32Array(tileData.length / 4);
            for (let i = 0; i < data.length; i++) {
                const heightValue = (tileData[i * 4] / 255) - .5;
                data[i] = min + heightValue * maxHeight;
            }
            return data;
        });
    }, [srcData, level, height]);
}

export function useSimpleJoint(
    a: MutableRefObject<RapierRigidBody>,
    b: MutableRefObject<RapierRigidBody>,
    pivotA: Vector3,
    pivotB: Vector3,
    axis: Vector3) {

    const joint = useRevoluteJoint(a, b, [
        // Position of the joint in bodyA's local space
        pivotA,
        // Position of the joint in bodyB's local space
        pivotB,
        // The axis of rotation in bodyA's local space
        axis
    ]);

    useEffect(() => {
        joint.current?.configureMotorVelocity(0, 10);
        joint.current?.configureMotorModel(MotorModel.AccelerationBased);
    }, [joint]);

    return joint;
}

export function useTrainPart(
    bodyRef: MutableRefObject<RapierRigidBody>,
    wheelsDistance: number,
    dollyDistance: number
) {
    const frontWheelsRef = useRef<RapierRigidBody>(null);
    const rearWheelsRef = useRef<RapierRigidBody>(null);

    useSimpleJoint(bodyRef, frontWheelsRef, [-wheelsDistance, -dollyDistance, 0], [0, 0, 0], [0, 1, 0]);
    useSimpleJoint(bodyRef, rearWheelsRef, [wheelsDistance, -dollyDistance, 0], [0, 0, 0], [0, 1, 0]);

    return [frontWheelsRef, rearWheelsRef] as [
        front: MutableRefObject<RapierRigidBody>,
        rear: MutableRefObject<RapierRigidBody>
    ]
}

export function useToggledComponent<P extends object>(ToggledComponent: ComponentType<P>, toggle: boolean) {
    return useMemo(() => {
        return (props: PropsWithChildren<P>) => {
            return toggle ? (<ToggledComponent {...props} />) : (props.children ? <>{props.children}</> : null);
        };
    }, [ToggledComponent, toggle]);
}

export function useAnimationFrame(callback: (delta: number) => any): void  {
    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>();
    const animate = useCallback((time: number) => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime)
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }, [callback])

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [animate]);
}
