import {Model} from '../models/OverBridge.tsx';
import {GroupProps} from '@react-three/fiber';
import React, { useMemo } from "react";

export const OverBridge: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <Model/>
        </group>
    )
});
