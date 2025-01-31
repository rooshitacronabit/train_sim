import {GroupProps} from '@react-three/fiber';
import {Model} from '../../models/BridgeCurvedModel';

export function BridgeStraight(props: GroupProps) {
    return (
        <group {...props}>
            <Model scale={25} position={[0, -3.6, 0]}/>
        </group>
    )
}
