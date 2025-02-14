import React from "react";
import { TreesModel, TreesModel2, TreesModel4 } from "../components/landscape/NewTrees";

const TreesCollection = ({
  positionOffset = [0, 0, 0],
  modelCounts = { TreesModel: 10, TreesModel2: 15, },
  spacing = 10, // Dynamic spacing between trees
}) => {
  // Define clusters with center, model, and scale
  const clusters = [
    { center: [-145, 0, 6], model: TreesModel, scale: 0.01, modelName: "TreesModel" },
    { center: [-135, 0, 3], model: TreesModel2, scale: 0.025, modelName: "TreesModel2" },
    // { center: [-135, 0, 10], model: TreesModel4, scale: 5, modelName: "TreesModel4" },
  ];

  // Generate trees with fixed positions around a cluster center
  const generateCluster = (center, Model, scale, count, spacing) => {
    const trees = [];
    for (let i = 0; i < count; i++) {
      // Calculate fixed positions using a grid pattern
      const gridSize = Math.ceil(Math.sqrt(count)); // Determine grid size based on count
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      const offsetX = col * spacing - (gridSize * spacing) / 3; // Center grid on X
      const offsetZ = row * spacing - (gridSize * spacing) / 2; // Center grid on Z
      trees.push(
        <Model
          key={`${center[0]}-${center[2]}-${i}`}
          scale={scale}
          position={[
            center[0] + positionOffset[0] + offsetX,
            center[1] + positionOffset[1],
            center[2] + positionOffset[2] + offsetZ,
          ]}
          rotation={[0, 0, 0]} // Static Y rotation
        />
      );
    }
    return trees;
  };

  return (
    <>
      {clusters.map((cluster, index) => {
        const count = modelCounts[cluster.modelName] || 10; // Get model count from modelCounts or default to 10
        return generateCluster(
          cluster.center,
          cluster.model,
          cluster.scale,
          count,
          spacing
        );
      })}
    </>
  );
};

export default TreesCollection;
