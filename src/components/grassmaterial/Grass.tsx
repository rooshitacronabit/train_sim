import React, { useMemo } from "react";
import {Model} from '../../models/grassmodel/MultipleGrass';
import {GroupProps} from '@react-three/fiber';

export const Grass: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <Model/>
        </group>
    )
});