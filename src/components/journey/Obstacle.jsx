import React from 'react';

const Obstacle = ({ position, rotation, geometry, material, scale }) => {
  return (
    <mesh
      geometry={geometry}
      position={position}
      rotation-y={rotation}
      material={material}
      scale={scale}
      castShadow
      receiveShadow
    />
  );
};

export default Obstacle;
