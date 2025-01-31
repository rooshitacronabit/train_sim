import {useMemo} from 'react';
import {ConeCollider, CylinderArgs, CylinderCollider} from '@react-three/rapier';
import {trackDepth, trackSize, wheelFullWidth, wheelRadius, wheelThickness} from '../common';

export interface WheelProps {
    pos: number;
}

export interface CuboidProps {
    args: CylinderArgs;
    position: [number, number, number];
    rotation: [number, number, number];
}

export function Wheel({pos}: WheelProps) {

    return (
        <>
            <ConeCollider friction={0.2} args={[0.1, wheelFullWidth]} position={[pos, 0.02, 0]} rotation={[0, 0, 0]}/>
            <ConeCollider friction={0.2} args={[0.1, wheelFullWidth]} position={[pos, -0.02, 0]} rotation={[0, 0, Math.PI]}/>
            {/*{colliders.map((props, ndx) => (*/}
            {/*    <CylinderCollider key={ndx} {...props}/>*/}
            {/*))}*/}
        </>
    );
}
