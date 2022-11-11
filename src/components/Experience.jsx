import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React from 'react';
import Journey from './journey/Journey';
import Lights from './utils/Lights';

const Experience = () => {
  return (
    <>
      <Canvas>
        <OrbitControls makeDefault />
        <color args={['#252731']} attach={'background'} />
        <Lights />
        <Physics>
          <Journey />
        </Physics>
      </Canvas>
    </>
  );
};

export default Experience;
