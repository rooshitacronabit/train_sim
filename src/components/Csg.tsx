import {CameraControls, Stats} from '@react-three/drei';
import {Addition, Base, Geometry, ReverseSubtraction, Subtraction} from '@react-three/csg';
import {useLoader} from '@react-three/fiber';
import * as THREE from 'three';

export function Csg() {
    const [map, displacementMap] = useLoader(THREE.TextureLoader, ['/landscape-texture.jpg', '/landscape-heightmap.jpg']);
    return (
        <>
            <ambientLight intensity={0.3}/>
            <CameraControls
                minDistance={0}
                maxDistance={150}
                minPolarAngle={Math.PI * 0.2}
                maxPolarAngle={Math.PI * 0.45}
                minAzimuthAngle={-Math.PI * 0.45}
                maxAzimuthAngle={Math.PI * 0.45}
                minZoom={0.2}
                maxZoom={0.3}
            ></CameraControls>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                {/*<Geometry>*/}
                {/*    <Base>*/}
                {/*        <planeGeometry args={[700, 700, 128, 128]}/>*/}
                {/*    </Base>*/}
                {/*    <Subtraction>*/}
                {/*        <boxGeometry args={[5, 5, 5]}/>*/}
                {/*    </Subtraction>*/}
                {/*    <Addition>*/}
                {/*        <planeGeometry args={[5, 5, 2, 2]}/>*/}
                {/*    </Addition>*/}
                {/*</Geometry>*/}
                <planeGeometry args={[700, 700, 128, 128]}/>
                <meshStandardMaterial map={map}
                                      displacementMap={displacementMap}
                                      displacementScale={20}/>
            </mesh>
            <Stats></Stats>
        </>
    );
}
