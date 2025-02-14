// Import required models
import { Model as NewTreesModel } from '../../models/trees/NewTreesModel';
import { Model as NewTreesModel2 } from '../../models/trees/NewTreesModel2';
import { Model as NewTreesModel3 } from '../../models/trees/NewTreesModel3';
import { Model as NewTreesModel4 } from '../../models/trees/NewTreesModel4';
import { Model as NewTreesModel5 } from '../../models/trees/NewTreesModel5';
import { Model as FarmModel } from '../../models/trees/tall_green_model';

import { GroupProps } from '@react-three/fiber';
import React, { useMemo } from "react";


export const TreesModel: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <NewTreesModel scale={[0.2, 0.2, 0.2]} />
        </group>
    )
});
export const TreesModel2: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <NewTreesModel2 scale={[0.2, 0.2, 0.2]} />
        </group>
    )
});
export const TreesModel3: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <NewTreesModel3 scale={[0.2, 0.2, 0.2]} />
        </group>
    )
});
export const TreesModel4: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <NewTreesModel4 scale={[0.2, 0.2, 0.2]} />
        </group>
    )
});
export const TreesModel5: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <NewTreesModel5 scale={[0.2, 0.2, 0.2]} />
        </group>
    )
});
export const Farm: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <FarmModel scale={[0.2, 0.2, 0.2]} />
        </group>
    )
});