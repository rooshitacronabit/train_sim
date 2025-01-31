import {Instances, Model} from '../../models/trees/SimpleTreeModel';
import {GroupProps} from '@react-three/fiber';
import {createNoise2D} from 'simplex-noise'
import {useMemo} from 'react';
export interface TreePatchProps extends GroupProps {
    seed?: number;
    count?: number; // Number of trees
    spacing?: number; // Spacing between trees
    rowCount?: number; // Number of rows
    rowSpacing?: number; // Spacing between rows
    width?: number; // Variation in width
    length?: number; // Variation in length
}

export function SimpleTree({
    seed = Math.random(),
    count = 5,
    spacing = 5,
    rowCount = 4,
    rowSpacing = 3,
    width = 0.5,
    length = 10,
    ...props
}: TreePatchProps) {
    const positions = useMemo(() => {
        const noise = createNoise2D(() => seed);
        const treePositions = [];
        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < count; j++) {
                const x = j * spacing + noise(j, i) * width;
                const y =  Math.random() * -0.4;
                const z = i * rowSpacing + noise(i, j) * length;
                treePositions.push([x, y, -z]);
            }
        }
        return treePositions;
    }, [seed, count, spacing, rowCount, rowSpacing, width, length]);

    return (
        <Instances {...props}>
            {positions.map((position, index) => (
                <Model
                    key={index}
                    position={position}
                    scale={[0.15, 0.15, 0.15]}
                    rotation={[0, Math.PI, 0]}
                />
            ))}
        </Instances>
    );
}