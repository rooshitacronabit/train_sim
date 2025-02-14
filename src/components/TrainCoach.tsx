import * as THREE from 'three';
import {forwardRef, useMemo} from 'react';
import {CuboidCollider, RapierRigidBody, RigidBody} from '@react-three/rapier';

import {TrainProps} from '../common';
import {useInternalRef, useTrainPart} from '../Hooks';
import {Wheels} from './Wheels';
import {Model} from '../models/TrainCoachModel';

const coachWheelDistance = 2.225;

export const TrainCoach = forwardRef<RapierRigidBody, TrainProps>(
    ({position, children, ...props}, ref) => {

        const dollyDistance = 0.7;

        const frontWheelPos = useMemo(() => {
            return new THREE.Vector3(-coachWheelDistance, -dollyDistance, 0).add(position);
        }, [position, dollyDistance]);

        const rearWheelPos = useMemo(() => {
            return new THREE.Vector3(coachWheelDistance, -dollyDistance, 0).add(position);
        }, [position, dollyDistance]);

        const [bodyRef, bodyCb] = useInternalRef<RapierRigidBody>(ref);
        const [frontWheels, rearWheels] = useTrainPart(
            bodyRef,
            coachWheelDistance,
            dollyDistance
        );

        return (
            <>
                <RigidBody name='coach' canSleep={false} colliders={false} ref={bodyCb} position={position} {...props}>
                    <CuboidCollider args={[coachWheelDistance, 0.1, 0.6]} />
                    <Model scale={.25} position={[0, -0.3, 0]}/>
                </RigidBody>
                <Wheels ref={frontWheels} position={frontWheelPos}/>
                <Wheels ref={rearWheels} position={rearWheelPos}/>
            </>
        )
    }
);
