import {Model} from '../models/ConcreteBridges.tsx';
import {GroupProps} from '@react-three/fiber';

export function ConcreteBridges(props: GroupProps) {
    return (
        <group {...props}>
            <Model/>
        </group>
    )
}
