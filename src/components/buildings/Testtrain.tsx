import { Model } from '../../models/DemotrainModel/DemotrainModel';
import { GroupProps } from '@react-three/fiber';

export function Traint(props: GroupProps) {
    return (
        <group {...props}>
            <Model />
        </group>
    )
}
