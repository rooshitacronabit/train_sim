import React, { useMemo } from "react";
import { GroupProps } from "@react-three/fiber";
import { Model } from "../../models/newStation1";

export const Station: React.FC<GroupProps> = React.memo((props) => {
  // Memoize props to prevent unnecessary recalculations
  const memoizedProps = useMemo(() => props, [props]);

  return (
    <group {...memoizedProps}>
      <Model />
    </group>
  );
});
