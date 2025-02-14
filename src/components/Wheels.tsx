import {forwardRef, useEffect, useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {CuboidCollider, RapierRigidBody, RigidBody} from '@react-three/rapier';
import {TrainProps} from '../common';
import {useGlobalContext, useInternalRef} from '../Hooks';

export const Wheels = forwardRef<RapierRigidBody, TrainProps>(
    ({type, position, ...props}, ref) => {

        const { currentSpeed, path} = useGlobalContext();
        const [bodyRef, bodyCb] = useInternalRef(ref);
        const distance = useRef(0);
        const length = useRef(0);
        
        
        
        
        useFrame(() => {
            if (!path || !bodyRef.current || currentSpeed.current === 0) return;
            const speed = currentSpeed.current / 750;
           distance.current += speed 
            // console.log("distance: " , distance.current,length.current);
            
            const index = Math.min(Math.max(distance.current / length.current, 0), 1);
            // console.log("ind : ", index);
            const pos = path.getPointAt(index);
            // console.log("pos : ",pos);
            bodyRef.current.setTranslation(pos, true);
        });

        useEffect(() => {
            if (!path) return;
            // console.log("Path : ",path);

            length.current = path.getLength();
            const count = Math.ceil(length.current * 50);
            
            const points = path.getSpacedPoints(count);
            const currentPos = bodyRef.current.translation();
            let minDist = Number.MAX_VALUE;
            let closest = Number.MAX_VALUE;
            points.forEach((point, ix) => {
                const d = point.distanceTo(currentPos);
                if (d < minDist) {
                    minDist = d;
                    closest = ix / count * length.current;
                }
            });
            distance.current = closest;
        }, [bodyRef, path]);

        return (
            <RigidBody colliders={false} type='kinematicPosition' ref={bodyCb} position={position} {...props}>
                {/* <CuboidCollider args={[0.5, 0.2, 0.5]} /> */}
            </RigidBody>
        );
    }
);
