import React from 'react';
import Start from './Start';
import * as THREE from 'three';
import End from './End';
import Section from './Section';
import sectionData from '../../data/sectionData';
import Room from './Room';
import Wall from './Wall';
import Obstacle from './Obstacle';
import { RigidBody } from '@react-three/rapier';
import { useTexture } from '@react-three/drei';
import SectionImage from './SectionImage';
import MovementImage from './MovementImage';

THREE.ColorManagement.legacyMode = false;

const depth = 80;
const width = 0.3;
const scaleValue = 122;
const wallScaleValue = 100;
const scale = [scaleValue, 0.2, depth];
const wallScale = [width, wallScaleValue, depth];
const frontWallScale = [scaleValue, wallScaleValue, width];
const meshPosition = [0, -0.1, 0];

const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 64, 64, 64);
const planeGeometry = new THREE.PlaneGeometry(1, 1, 64, 64);
const floorMaterial = new THREE.MeshStandardMaterial({ color: '#000000' });
const textMaterial = new THREE.MeshStandardMaterial({
  color: '#3d3d3d',
  opacity: 1,
  transparent: true,
  roughness: 0.2,
  metalness: 0.8,
});
const floorSectionMaterial = new THREE.MeshStandardMaterial({
  color: '#3d3d3d',
  opacity: 0.95,
  transparent: true,
  roughness: 0.2,
  metalness: 0.8,
});
const roomSectionMaterial = new THREE.MeshStandardMaterial({
  color: '#3d3d3d',

  opacity: 1,
  transparent: true,
  roughness: 0,
  metalness: 0.8,
});

const Journey = () => {
  console.log('journey');
  const sectionImages = sectionData.map((section) => {
    const texture = useTexture(section.image);
    texture.name = section.heading;
    return texture;
  });
  const sections = sectionData.map((section, index) => {
    return (
      <>
        <Section
          key={index + 'section'}
          position={[0, 0, -(index + 1) * depth]}
          boxGeometry={planeGeometry}
          floorMaterial={floorSectionMaterial}
          textMaterial={textMaterial}
          scale={scale}
          meshPosition={meshPosition}
          heading={section.heading}
          obstacles={section.languages}
          obstaclesLength={section.languages.length}
          index={index}
          image={sectionImages[index]}
        />
        <RigidBody type={'fixed'}>
          <Wall
            key={index + 'sideWall'}
            position={[
              index % 2 === 0
                ? scaleValue * 2 - scaleValue / 2 - width / 2
                : -scaleValue * 2 + scaleValue / 2 + width / 2,
              wallScaleValue / 2,
              -(index + 1) * depth,
            ]}
            boxGeometry={boxGeometry}
            wallMaterial={roomSectionMaterial}
            scale={wallScale}
            meshPosition={meshPosition}
          />
        </RigidBody>
        <RigidBody type={'fixed'}>
          <Wall
            key={index + 'frontWall'}
            position={[
              index % 2 === 0 ? scaleValue : -scaleValue,
              wallScaleValue / 2,
              -(index + 1) * depth + depth / 2,
            ]}
            boxGeometry={boxGeometry}
            wallMaterial={roomSectionMaterial}
            scale={frontWallScale}
            meshPosition={meshPosition}
          />
        </RigidBody>
        <RigidBody type={'fixed'}>
          <Wall
            key={index + 'backWall'}
            position={[
              index % 2 === 0 ? scaleValue : -scaleValue,
              wallScaleValue / 2,
              -(index + 1) * depth - depth / 2,
            ]}
            boxGeometry={boxGeometry}
            wallMaterial={roomSectionMaterial}
            scale={frontWallScale}
            meshPosition={meshPosition}
          />
        </RigidBody>
        <RigidBody type={'fixed'}>
          <Room
            key={index + 'room'}
            position={[
              index % 2 === 0 ? scaleValue : -scaleValue,
              0,
              -(index + 1) * depth,
            ]}
            boxGeometry={boxGeometry}
            floorMaterial={roomSectionMaterial}
            scale={scale}
            meshPosition={meshPosition}
            roomImages={section.roomImages}
            left={index % 2 === 0 ? true : false}
          />
        </RigidBody>
        <RigidBody type={'fixed'}>
          <Wall
            key={index + 'wall'}
            position={[
              index % 2 === 0
                ? -scaleValue / 2 - width / 2
                : scaleValue / 2 + width / 2,
              wallScaleValue / 2,
              -(index + 1) * depth,
            ]}
            boxGeometry={boxGeometry}
            wallMaterial={roomSectionMaterial}
            scale={wallScale}
            meshPosition={meshPosition}
          />
        </RigidBody>
      </>
    );
  });
  return (
    <>
      <RigidBody type={'fixed'} restitution={0.2} friction={0}>
        <Start
          position={[0, 0, 0]}
          boxGeometry={boxGeometry}
          floorMaterial={floorSectionMaterial}
          scale={scale}
          meshPosition={meshPosition}
        />
      </RigidBody>
      {sections}
      <RigidBody type={'fixed'} restitution={0.2} friction={0}>
        <End
          position={[0, 0, -sectionData.length * depth - depth]}
          boxGeometry={boxGeometry}
          floorMaterial={floorSectionMaterial}
          scale={scale}
          meshPosition={meshPosition}
        />
      </RigidBody>
      <RigidBody type={'fixed'} restitution={0.2} friction={0}>
        <Wall
          position={[
            0,
            wallScaleValue / 2,
            -depth / 2 + width / 2 - sectionData.length * depth - depth,
          ]}
          boxGeometry={boxGeometry}
          wallMaterial={roomSectionMaterial}
          scale={frontWallScale}
          meshPosition={meshPosition}
        />
      </RigidBody>
      <RigidBody type={'fixed'} restitution={0.2} friction={0}>
        <Wall
          position={[
            scaleValue / 2 + width / 2,
            wallScaleValue / 2,
            -sectionData.length * depth - depth,
          ]}
          boxGeometry={boxGeometry}
          wallMaterial={roomSectionMaterial}
          scale={wallScale}
          meshPosition={meshPosition}
        />
      </RigidBody>
      <RigidBody type={'fixed'} restitution={0.2} friction={0}>
        <Wall
          position={[
            -scaleValue / 2 - width / 2,
            wallScaleValue / 2,
            -sectionData.length * depth - depth,
          ]}
          boxGeometry={boxGeometry}
          wallMaterial={roomSectionMaterial}
          scale={wallScale}
          meshPosition={meshPosition}
        />
      </RigidBody>
      <MovementImage images={sectionImages} index={0} />
    </>
  );
};

export default Journey;
