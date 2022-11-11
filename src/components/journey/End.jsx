import React from 'react';

const End = ({ position = [0, 0, 4], boxGeometry, floorMaterial }) => {
  return (
    <group position={position}>
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeometry}
        material={floorMaterial}
        scale={[4, 0.2, 4]}
      />
    </group>
  );
};

export default End;
