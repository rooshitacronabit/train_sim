import {Model} from '../../models/building/CabinModel';
import {GroupProps} from '@react-three/fiber';

export function Cabin(props: GroupProps) {
    return (
        <group {...props}>
            <Model rotation={[0, -Math.PI, 0]}/>
        </group>
    )
}
