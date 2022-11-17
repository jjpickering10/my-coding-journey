import { Edges, Text, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef } from 'react';
import useJourney from '../../stores/useJourney';
import Obstacle from './Obstacle';
import SectionImage from './SectionImage';
import * as THREE from 'three';

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
  // const sectionImage = useTexture(image);
  const updateSection = useJourney((state) => state.setSection);
  const updateTexture = useJourney((state) => state.setTexture);
  const floorRef = useRef();
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
          meshPosition[1],
          meshPosition[2] + 10,
        ]}
        rotation={Math.random()}
        text={obstacles[i]}
        index={index}
      />
    );
  }

  const setSectionImage = () => {
    updateSection(heading);
    updateTexture(index);
  };

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
        <RigidBody onCollisionEnter={setSectionImage} type={'fixed'}>
          <mesh
            ref={floorRef}
            position={meshPosition}
            castShadow
            receiveShadow
            rotation-x={-Math.PI / 2}
            geometry={boxGeometry}
            material={floorMaterial}
            scale={[122, 60, 1]}
          >
            {/* <meshBasicMaterial
              attach={'material'}
              map={image}
              side={THREE.DoubleSide}
            /> */}
          </mesh>
        </RigidBody>

        <SectionImage image={image} index={index} />
        {obstaclesArray}
      </group>
    </>
  );
};

export default Section;
