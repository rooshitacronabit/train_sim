import {Instances, Model} from '../../models/TreesBushesModel.tsx';
import {GroupProps} from '@react-three/fiber';
import {createNoise2D} from 'simplex-noise'
import {useMemo} from 'react';

export interface TreePatchProps extends GroupProps {
    seed?: number;
    width?: number;
    length?: number;
}

export function TreePatch({seed, width, length, ...props}: TreePatchProps) {

    const positions = useMemo(() => {
        const noise = createNoise2D(() => {
            return seed || Math.random();
        });
        const positions = [];
        const w = width || 160;
        const l = length || 20;
        for (let a = 0; a <= 60; a += 6) {
            const theta = a * Math.PI / 180;
            const r = noise(a, 0);
            const x = Math.cos(theta) * r * w;
            const y = Math.floor(Math.random() * (1 - (-1.5) + 1)) + (-1.5);
            const z = Math.sin(theta) * r * l;
            positions.push([x, y, z]);
        }
        return positions
    }, [seed, width, length]);

    return (
        <Instances {...props}>
            {positions.map((position, index) => (
                <Model key={index} position={position} scale={[0.15, 0.15, 0.15]}/>
            ))}
        </Instances>
    )
}
