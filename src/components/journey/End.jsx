import React from 'react';

const End = ({
  position = [0, 0, 8],
  boxGeometry,
  floorMaterial,
  scale,
  meshPosition,
}) => {
  return (
    <group position={position}>
      <mesh
        position={meshPosition}
        receiveShadow
        geometry={boxGeometry}
        material={floorMaterial}
        scale={scale}
      />
    </group>
  );
};

export default End;
