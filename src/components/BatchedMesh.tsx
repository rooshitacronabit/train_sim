import * as THREE from 'three';
import {GroupProps, BatchedMeshProps as Base} from '@react-three/fiber';
import {useCallback, useEffect, useMemo} from 'react';
import {useRefWithCallback} from '../Hooks.tsx';

export interface BatchedMeshProps extends Base {
    geometry: THREE.BufferGeometry;
    matrices: THREE.Matrix4[];
}

type BatchArgs = [maxInstanceCount: number, maxVertexCount: number, maxIndexCount: number];

export function BatchedMesh({geometry, matrices, children, ...props}: BatchedMeshProps) {

    const [batchRef, batchRefCb] = useRefWithCallback<THREE.BatchedMesh>(mesh => {
        updateMesh();
    });

    const batchArgs = useMemo(() => {
        if (!geometry || !matrices) {
            return [0, 0, 0] as BatchArgs;
        }
        return [
            matrices.length,
            matrices.length * (geometry.attributes.position?.count ?? 4),
            matrices.length * (geometry.index?.count ?? 6)
        ] as BatchArgs;
    }, [geometry, matrices]);

    const updateMesh = useCallback(() => {
        const batch = batchRef.current;
        if (!geometry || !batch || (batch as any)._geometryCount) return;
        batch.clear();
        const id = batch.addGeometry(geometry);
        matrices?.forEach(matrix => {
            const instance = batch.addInstance(id);
            batch.setMatrixAt(instance, matrix);
        });
    }, [batchRef, matrices, geometry]);

    useEffect(() => {
        updateMesh();
    }, [updateMesh]);

    return (
        <batchedMesh {...props}
                     ref={batchRefCb}
                     sortObjects={false}
                     frustumCulled={true}
                     perObjectFrustumCulled={true}
                     args={batchArgs}>
            {children}
        </batchedMesh>
    );
}