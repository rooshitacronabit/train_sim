import { Model } from '../../models/DemotrainModel/GrassDrySingleModel';
import { GroupProps } from '@react-three/fiber';
import React, { useMemo } from "react";

export const GrassDrySingle: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <Model />
        </group>
    )
});
