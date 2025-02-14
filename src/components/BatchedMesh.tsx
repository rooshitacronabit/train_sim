import * as THREE from 'three';
import { GroupProps } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef } from 'react';

export interface BatchedMeshProps extends GroupProps {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  matrices: THREE.Matrix4[];
}

/**
 * BatchedMesh: A component to efficiently render multiple instances of a geometry using matrices.
 */
export function BatchedMesh({ geometry, material, matrices, ...props }: BatchedMeshProps) {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  const instanceCount = useMemo(() => matrices.length, [matrices]);

  const updateMatrices = useCallback(() => {
    if (!instancedMeshRef.current) return;

    matrices.forEach((matrix, index) => {
      instancedMeshRef.current!.setMatrixAt(index, matrix);
    });

    instancedMeshRef.current!.instanceMatrix.needsUpdate = true;
  }, [matrices]);

  useEffect(() => {
    updateMatrices();
  }, [updateMatrices]);

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[geometry, material, instanceCount]}
      {...props}
    />
  );
}
