import { Text } from '@react-three/drei';
import React from 'react';
import Obstacle from './Obstacle';

const Section = ({
  position = [0, 0, 4],
  boxGeometry,
  floorMaterial,
  scale,
  meshPosition,
  heading,
  obstacles,
}) => {
  const obstaclesArray = [];
  for (let i = 0; i < obstacles; i++) {
    obstaclesArray.push(
      <Obstacle
        key={i + 'obstacle'}
        geometry={boxGeometry}
        material={floorMaterial}
        scale={[1, 1, 1]}
        position={[
          meshPosition[0] + (i % 2) === 0
            ? i * (10 / obstacles) + 10 / obstacles - 1
            : i * -(10 / obstacles) + 10 / obstacles - 1,
          meshPosition[1] + 0.5,
          meshPosition[2] + (Math.random() - 0.5) * 5,
        ]}
        rotation={Math.random()}
      />
    );
  }
  return (
    <group position={position}>
      <Text scale={15} position={[0, 5, meshPosition[2] + 2.5]}>
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
      {obstaclesArray}
    </group>
  );
};

export default Section;
