import { Edges, Text, useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React from 'react';
import Obstacle from './Obstacle';
import SectionImage from './SectionImage';

const Section = ({
  position = [0, 0, 4],
  boxGeometry,
  floorMaterial,
  textMaterial,
  scale,
  meshPosition,
  heading,
  obstacles,
  obstaclesLength,
  index,
  image,
}) => {
  const sectionImage = useTexture(image);
  const obstaclesArray = [];
  for (let i = 0; i < obstaclesLength; i++) {
    obstaclesArray.push(
      <Obstacle
        key={i + 'obstacle'}
        geometry={boxGeometry}
        material={textMaterial}
        scale={[1, 1, 1]}
        position={[
          meshPosition[0] -
            2.5 +
            (index % 2 === 0 ? -17 : 17) +
            (Math.random() - 0.5) * 5,
          // meshPosition[0] + (i % 2) === 0
          //   ? i * (10 / obstaclesLength) +
          //     10 / obstaclesLength -
          //     10 / obstaclesLength
          //   : i * -(10 / obstaclesLength) +
          //     10 / obstaclesLength -
          //     10 / obstaclesLength,
          meshPosition[1],
          // meshPosition[2] + (Math.random() - 0.5) * 5,
          meshPosition[2] + 10,
        ]}
        rotation={Math.random()}
        text={obstacles[i]}
        index={index}
      />
    );
  }
  return (
    <>
      <group position={position}>
        <Text scale={15} position={[0, 10, meshPosition[2] + 2.5]}>
          {heading}
          <meshBasicMaterial
            toneMapped={false}
            color={'#ffffff'}
            opacity={0.25}
          />
        </Text>
        <RigidBody type={'fixed'}>
          <mesh
            position={meshPosition}
            castShadow
            receiveShadow
            geometry={boxGeometry}
            material={floorMaterial}
            scale={scale}
          />
        </RigidBody>

        <SectionImage image={sectionImage} index={index} />
        {obstaclesArray}
      </group>
    </>
  );
};

export default Section;
