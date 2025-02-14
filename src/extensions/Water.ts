import { Water } from 'three-stdlib'
import {extend, Object3DNode} from '@react-three/fiber';

extend({ Water });

declare module "@react-three/fiber" {
    interface ThreeElements {
        water: Object3DNode<Water, typeof Water>;
    }
}
