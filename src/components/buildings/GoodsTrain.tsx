import { Model } from '../../models/DemotrainModel/GoodstrainModel';
import { GroupProps } from '@react-three/fiber';

export function GoodsTrain(props: GroupProps) {
    return (
        <group {...props}>
            <Model />
        </group>
    );
}