import React from 'react';

const Wall = ({
  position = [0, 0, 4],
  boxGeometry,
  wallMaterial,
  scale,
  meshPosition,
}) => {
  return (
    <group position={position}>
      <mesh
        position={meshPosition}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={scale}
        castShadow
      />
    </group>
  );
};

export default Wall;
