import * as THREE from 'three';
import { GroupProps, useLoader } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';

export interface TerrainProps extends GroupProps {
    diffuse: string;
    elevation: string;
    size?: number;
    height?: number;
    resolution?: number;
}

export function Terrain({ diffuse, elevation, size, height, resolution, ...props }: TerrainProps) {
    const [map, displacementMap] = useLoader(THREE.TextureLoader, [diffuse, elevation]);

    map.repeat.set(6, 6);
    map.anisotropy = 10;
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.generateMipmaps = true;
    map.minFilter = THREE.LinearMipmapLinearFilter;
    map.magFilter = THREE.LinearFilter;


    return (
        <group {...props}>
            <Instances limit={1000} castShadow receiveShadow>
                <planeGeometry args={[size, size, resolution, resolution]} />
                <meshStandardMaterial
                    map={map}
                    displacementMap={displacementMap}
                    displacementScale={height ?? 50}
                    
                />
                <Instance rotation={[-Math.PI / 2, 0, 0]} />
                
            </Instances>
        </group>
    );
}
