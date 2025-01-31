import * as THREE from 'three';
import {useMemo, useRef} from 'react';
import {SignalBulbProps} from '../common';

const intensity = 5;
const bulbArgs = [0.009] as [radius: number];
const targetPos = [5, 0, 0] as [number, number, number];

export function SignalBulb({position, color, on}: SignalBulbProps) {

    const pointColor = useMemo(() => {
        const res = new THREE.Color(color);
        const hsl = {h: 0, s: 0, l: 0} as THREE.HSL;
        res.getHSL(hsl);
        hsl.l = 0.05;
        return res.setHSL(hsl.h, hsl.s, hsl.l);
    }, [color]);

    const spotColor = useMemo(() => {
        const res = new THREE.Color(color);
        const hsl = {h: 0, s: 0, l: 0} as THREE.HSL;
        res.getHSL(hsl);
        hsl.l = 0.65;
        return res.setHSL(hsl.h, hsl.s, hsl.l);
    }, [color]);

    const target = useRef<THREE.Object3D>(null);

    return (
        <group position={position}>
            <object3D position={[25, 0, 0]} ref={target}/>
            {on && (
                <>
                    {/*{target.current &&*/}
                    {/*    <spotLight target={target.current}*/}
                    {/*               angle={0.535}*/}
                    {/*               color={spotColor}*/}
                    {/*               intensity={20}/>}*/}
                    {/*<pointLight color={pointColor} position={[0.025, 0, 0]} distance={0.05} intensity={25}/>*/}
                </>
            )}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                {/*<cylinderGeometry args={[0.009, 0.009, 0.005, 15]}/>*/}
                <sphereGeometry args={[0.015]}/>
                <meshStandardMaterial color={color} emissive={on ? pointColor : color}/>
            </mesh>
        </group>
    );
}
