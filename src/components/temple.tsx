// import {Model} from '../models/underBridge.tsx';
import {Model} from '../models/building/Temple';

import {GroupProps} from '@react-three/fiber';
import React, { useMemo } from "react";

export const Temple: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <Model/>
        </group>
    )
});
