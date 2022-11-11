import React from 'react';

const Room = ({
  position = [0, 0, 4],
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

export default Room;
