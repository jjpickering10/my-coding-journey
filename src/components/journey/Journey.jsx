import React from 'react';
import Start from './Start';
import * as THREE from 'three';
import End from './End';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floorMaterial = new THREE.MeshStandardMaterial({ color: '#111111' });

const Journey = () => {
  return (
    <>
      <Start boxGeometry={boxGeometry} floorMaterial={floorMaterial} />
      <End boxGeometry={boxGeometry} floorMaterial={floorMaterial} />
    </>
  );
};

export default Journey;
