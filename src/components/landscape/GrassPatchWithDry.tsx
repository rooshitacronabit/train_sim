import {Instances, Model} from '../../models/trees/GrassPatchWithDryModel';
import {GroupProps} from '@react-three/fiber';
import {createNoise2D} from 'simplex-noise'
import {useMemo} from 'react';

export interface TreePatchProps extends GroupProps {
    seed?: number;
    width?: number;
    length?: number;
}

export function GrassPatchWithDry({seed, width, length, ...props}: TreePatchProps) {

    const positions = useMemo(() => {
        const noise = createNoise2D(() => {
            return seed || Math.random();
        });
        const positions = [];
        const w = width || 160;
        const l = length || 20;
        for (let a = 0; a <= 160; a += 15) {
            const theta = a * Math.PI / 180;
            const r = noise(a, 0);
            const x = Math.cos(theta) * r * w;
            const z = Math.sin(theta) * r * l;
            positions.push([x, 0, z]);
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
