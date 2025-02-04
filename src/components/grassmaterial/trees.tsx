import React from "react";
import { Model } from "../../models/grassmodel/TreeModel";

const TreeModel = ({
  positionOffset = [0, 0, 0],
  modelCounts = { TreesModel: 30 },
  spacing = 10, // For grid spacing
  radius = 30, // For circular tree arrangement
  layoutType = "both", // "grid", "circle", or "both"
}) => {
  // Define clusters with center, model, and scale
  const clusters = [
    { center: [-145, 0, 6], model: Model, scale: 0.0025, modelName: "TreesModel" },
  ];

  // Generate trees in a grid pattern
  const generateGridCluster = (center, Model, scale, count, spacing) => {
    const trees = [];
    const gridSize = Math.ceil(Math.sqrt(count)); // Determine grid size based on count
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      const offsetX = col * spacing - (gridSize * spacing) / 3; // Center grid on X
      const offsetZ = row * spacing - (gridSize * spacing) / 2; // Center grid on Z
      trees.push(
        <Model
          key={`grid-${center[0]}-${center[2]}-${i}`}
          scale={scale}
          position={[
            center[0] + positionOffset[0] + offsetX,
            center[1] + positionOffset[1],
            center[2] + positionOffset[2] + offsetZ,
          ]}
          rotation={[0, Math.random() * Math.PI * 2, 0]} // Random rotation
        />
      );
    }
    return trees;
  };

  // Generate trees in a circular pattern
  const generateCircularCluster = (center, Model, scale, count, radius) => {
    const trees = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2; // Distribute trees evenly in a circle
      const offsetX = Math.cos(angle) * radius;
      const offsetZ = Math.sin(angle) * radius;
      trees.push(
        <Model
          key={`circle-${center[0]}-${center[2]}-${i}`}
          scale={scale}
          position={[
            center[0] + positionOffset[0] + offsetX,
            center[1] + positionOffset[1],
            center[2] + positionOffset[2] + offsetZ,
          ]}
          rotation={[0, Math.random() * Math.PI * 2, 0]} // Random rotation
        />
      );
    }
    return trees;
  };

  return (
    <>
      {clusters.map((cluster, index) => {
        const count = modelCounts[cluster.modelName] || 10; // Default count if not provided

        return (
          <>
            {(layoutType === "grid" || layoutType === "both") &&
              generateGridCluster(cluster.center, cluster.model, cluster.scale, count, spacing)}

            {(layoutType === "circle" || layoutType === "both") &&
              generateCircularCluster(cluster.center, cluster.model, cluster.scale, count, radius)}
          </>
        );
      })}
    </>
  );
};

export default TreeModel;
