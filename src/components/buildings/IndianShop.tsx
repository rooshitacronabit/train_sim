import { GroupProps } from '@react-three/fiber';
import { Model } from '../../models/IndianShopModel';
import React, { useMemo } from "react";

export const IndianShop: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <Model scale={[0.2, 0.2, 0.2]} rotation={[0, Math.PI / 2, 0]} />
        </group>
    )
});
