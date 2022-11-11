import React from 'react';

const Wall = ({
  position = [0, 0, 4],
  boxGeometry,
  wallMaterial,
  scale,
  meshPosition,
}) => {
  return (
    <mesh
      position={position}
      geometry={boxGeometry}
      material={wallMaterial}
      scale={scale}
      castShadow
    />
  );
};

export default Wall;
