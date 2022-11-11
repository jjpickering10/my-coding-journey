import { Text } from '@react-three/drei';
import React from 'react';

const Section = ({
  position = [0, 0, 4],
  boxGeometry,
  floorMaterial,
  scale,
  meshPosition,
  heading,
}) => {
  return (
    <group position={position}>
      <Text scale={8} position={[0, 2, meshPosition[2] + 2]}>
        {heading}
        <meshBasicMaterial toneMapped={false} color={'#ffffff'} />
      </Text>
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

export default Section;
