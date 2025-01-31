import React, { useMemo } from "react";
import {GroupProps} from '@react-three/fiber';
import {Model} from '../../models/DemotrainModel/FobBridgeModel';


export const FobBridge: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <Model scale={[0.2, 0.2, 0.2]}/>
        </group>
    )
});
