import React from 'react';

const Start = ({
  position = [0, 0, 0],
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

export default Start;
