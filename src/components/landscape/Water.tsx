import * as THREE from 'three';
import {Water as WaterImpl, WaterOptions} from 'three-stdlib';
import {GroupProps, useFrame, useLoader} from '@react-three/fiber';
import {useEffect, useMemo, useRef} from 'react';

export interface WaterProps extends GroupProps{
    size?: number;
    width?: number;
    length?: number;
}

export function Water({size, width, length, ...props}: WaterProps) {
    const waterNormals = useLoader(THREE.TextureLoader, './terrain/water-normals.jpg');
    const geom = useMemo(() => {
        return new THREE.PlaneGeometry(width ?? size ?? 256, length ?? size ?? 256, 10, 10);
    }, [width, length, size]);
    const ref = useRef<WaterImpl>();
    const config = useMemo(
        () => ({
            textureWidth: 512,
            textureHeight: 512,
            waterNormals,
            sunDirection: new THREE.Vector3(0, 1, 0),
            sunColor: "#c6b237",
            waterColor: "#195778",
            distortionScale: 3.7,
            fog: false
        } as WaterOptions),
        [waterNormals]
    );

    useEffect(() => {
        waterNormals.wrapS = THREE.RepeatWrapping;
        waterNormals.wrapT = THREE.RepeatWrapping;
    }, [waterNormals]);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.material.uniforms.time.value += delta;
        }
    });

    return (
        <group {...props}>
            <mesh geometry={geom} rotation-x={-Math.PI / 2}>
                <meshStandardMaterial color='lightblue' roughness={0.5} metalness={0.2}></meshStandardMaterial>
            </mesh>
            {/*<water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />*/}
        </group>
    );
}