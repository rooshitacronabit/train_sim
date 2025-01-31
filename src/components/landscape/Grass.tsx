import * as THREE from "three"
import {useRef, useMemo, createRef} from "react"
import {GroupProps, useFrame, useLoader} from "@react-three/fiber"

export interface GrassProps extends GroupProps {
    bw?: number;
    bh?: number;
    joints?: number;
    size?: number;
    tileSize?: number;
    instances?: number;
}

export interface GrassAttributeData {
    indices: Float32Array;
    offsets: Float32Array;
    scales: Float32Array;
    halfRootAngles: Float32Array;
}

export function Grass({bw, bh, joints, size, tileSize, instances, ...props}: GrassProps) {

    const [grassTexture, alphaMap] = useLoader(
        THREE.TextureLoader,
        ["./terrain/blade-diffuse.jpg", "./terrain/blade-alpha.jpg"]
    )
    const bladeGeom = useMemo(() => {
        const height = bh ?? 0.2;
        return new THREE.PlaneGeometry(
            bw ?? 0.024,
            height,
            1,
            joints ?? 4
        ).translate(0, height / 2, 0);
    }, [bw, bh, joints]);

    const attrData = useMemo(() => {
        return getAttributeData(
            Math.floor(instances ?? 15000),
            size ?? 512
        );
    }, [instances, size]);

    return (
        <group {...props}>
            <mesh frustumCulled={false} castShadow={false} receiveShadow={false}>
                <instancedBufferGeometry index={bladeGeom.index}
                                         attributes-position={bladeGeom.attributes.position}
                                         attributes-uv={bladeGeom.attributes.uv}>
                    <instancedBufferAttribute attach="attributes-index"
                                              args={[attrData.indices, 1]}/>
                    <instancedBufferAttribute attach="attributes-offset"
                                              args={[attrData.offsets, 3]}/>
                    <instancedBufferAttribute attach="attributes-scale"
                                              args={[attrData.scales, 1]}/>
                    <instancedBufferAttribute attach="attributes-halfRootAngle"
                                              args={[attrData.halfRootAngles, 2]}/>
                </instancedBufferGeometry>
                <meshStandardMaterial color={'#006600'}/>
            </mesh>
        </group>
    )
}

function getAttributeData(instances: number, width: number): GrassAttributeData {
    instances = Math.floor(instances ?? 10000);
    width = Math.floor(width ?? 32);

    // Each instance has its own data for position, orientation and scale
    const indices = [];
    const offsets = [];
    const scales = [];
    const halfRootAngles = [];

    //For each instance of the grass blade
    for (let i = 0; i < instances; i++){

        indices.push(i/instances);

        //Offset of the roots
        const x = Math.random() * width - width/2;
        const z = Math.random() * width - width/2;
        const y = 0;

        offsets.push(x, y, z);

        //Random orientation
        const angle = Math.PI - Math.random() * (2 * Math.PI);
        halfRootAngles.push(Math.sin(0.5*angle), Math.cos(0.5*angle));

        // Define variety in height
        if (i % 3 != 0){
            scales.push(2.0 + Math.random() * 1.25);
        } else {
            scales.push(2.0 + Math.random());
        }
    }

    return {
        indices: new Float32Array(indices),
        offsets: new Float32Array(offsets),
        scales: new Float32Array(scales),
        halfRootAngles: new Float32Array(halfRootAngles),
    }
}

function multiplyQuaternions(q1, q2) {
    const x = q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x
    const y = -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y
    const z = q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z
    const w = -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w
    return new THREE.Vector4(x, y, z, w)
}
