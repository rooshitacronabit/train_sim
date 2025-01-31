import {Model} from '../models/underBridge.tsx';
// import {Model} from '../models/PackedBridge';

import {GroupProps} from '@react-three/fiber';

export function UnderBridge(props: GroupProps) {
    return (
        <group {...props}>
            <Model/>
        </group>
    )
}
