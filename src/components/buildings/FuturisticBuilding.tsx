import {GroupProps} from '@react-three/fiber';
import {Model} from '../../models/FuturisticBuildingModel.tsx';

export function FuturisticBuilding(props: GroupProps) {
    return (
        <group {...props}>
            <Model scale={[0.2, 0.2, 0.2]}/>
        </group>
    )
}
