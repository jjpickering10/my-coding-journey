import React from 'react';
import Start from './Start';
import * as THREE from 'three';
import End from './End';
import Section from './Section';
import sectionData from '../../data/sectionData';

THREE.ColorManagement.legacyMode = false;

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floorMaterial = new THREE.MeshStandardMaterial({ color: '#111111' });
const floorSectionMaterial = new THREE.MeshStandardMaterial({
  color: '#222222',
});
const scale = [4, 0.2, 4];
const meshPosition = [0, -0.1, 0];

const Journey = () => {
  const sections = sectionData.map((section, index) => {
    return (
      <Section
        key={index}
        position={[0, 0, (index + 1) * 4]}
        boxGeometry={boxGeometry}
        floorMaterial={floorSectionMaterial}
        scale={scale}
        meshPosition={meshPosition}
        heading={section.heading}
      />
    );
  });
  return (
    <>
      <Start
        position={[0, 0, 0]}
        boxGeometry={boxGeometry}
        floorMaterial={floorMaterial}
        scale={scale}
        meshPosition={meshPosition}
      />
      {sections}
      <End
        position={[0, 0, sectionData.length * 4 + 4]}
        boxGeometry={boxGeometry}
        floorMaterial={floorMaterial}
        scale={scale}
        meshPosition={meshPosition}
      />
    </>
  );
};

export default Journey;
