import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const TreeGroup2 = ({ position, scale }) => {
    // Load the texture using useLoader
    const texture = useLoader(THREE.TextureLoader, './trees/bavadiya.png');

    // Enable texture transparency
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.anisotropy = 16;

    return (
        <group>
            {/* First Plane */}
            <mesh rotation={[0, 0, 0]} position={position} scale={scale}>
                <planeGeometry args={[5, 5]} />
                <meshBasicMaterial
                    map={texture}
                    transparent={true}
                    alphaTest={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Second Plane (rotated 90° for cross effect) */}
            <mesh rotation={[0, Math.PI / 2, 0]} position={position} scale={scale}>
                <planeGeometry args={[5, 5]} />
                <meshBasicMaterial
                    map={texture}
                    transparent={true}
                    alphaTest={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

export default TreeGroup2;
