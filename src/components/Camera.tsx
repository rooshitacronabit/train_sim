import * as THREE from 'three';
import {useCallback, useEffect, useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {CameraProps} from '../common';
import {useCamera, useGlobalContext} from '../Hooks';

const smoothDistance = 50;
const smoothDamper = 0.01;

export function Camera({index, fixed, position, distance, targetRef}: CameraProps) {
    // console.log("CAMREA : ",{index, fixed, position, distance, targetRef});
    
    const {camera, cameraControls} = useGlobalContext();
    const camRef = useCamera(index, fixed);
    const animated = useRef(false);
    const updateCamera = useCallback((init: boolean) => {
        const controls = cameraControls.current;
        const cam = camRef.current;
        const target = targetRef.current;
        if (camera !== index || !controls || !cam) return;
        if (init) {
            const maxDistance = distance ?? 150;
            animated.current = true;
            controls.maxDistance = Math.max(maxDistance, controls.maxDistance);
            controls.dollyTo(maxDistance * 0.5, true).then(() => {
                controls.maxDistance = maxDistance;
            });
        }
        const camPos = new THREE.Vector3();
        const targetPos = new THREE.Vector3();
        cam.getWorldPosition(camPos);
        target.getWorldPosition(targetPos);
        const currentPos = new THREE.Vector3();
        controls.getPosition(currentPos, false);
        const camDistance = currentPos.distanceTo(camPos);
        controls.smoothTime = Math.min(smoothDistance, camDistance) * smoothDamper;
        Promise.all([
            controls.moveTo(...camPos.toArray(), animated.current),
            controls.lookInDirectionOf(...targetPos.toArray(), animated.current),
        ]).then(() => {
            animated.current = false;
        });
    }, [camRef, camera, cameraControls, index, targetRef]);

    useFrame((_, delta) => {
        if (!fixed) return;
        updateCamera(false);
    });

    useEffect(() => {
        updateCamera(true);
    }, [updateCamera]);

    return (
        <group ref={camRef} position={position} ></group>
    );
}

