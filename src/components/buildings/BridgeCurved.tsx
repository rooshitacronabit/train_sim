import {GroupProps} from '@react-three/fiber';
import {Model} from '../../models/BridgeCurvedModel';

export function BridgeCurved(props: GroupProps) {
    return (
        <group {...props}>
            <Model scale={[3, 3, 3]} position={[0, -4.4, 0]}/>
        </group>
    )
}
