import {
  KeyboardControls,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Debug, Physics } from '@react-three/rapier';
import { useControls } from 'leva';
import React from 'react';
import Journey from './journey/Journey';
import Movement from './journey/Movement';
import Lights from './utils/Lights';
import { Leva } from 'leva';

const Experience = () => {
  const { position } = useControls({
    position: {
      value: {
        x: 0,
        y: 5,
        z: 18,
      },
      step: 1,
    },
    color: '#ff0000',
    x: 0,
  });

  return (
    <>
      <Leva />
      <KeyboardControls
        map={[
          {
            name: 'up',
            keys: ['ArrowUp', 'KeyW'],
          },
          {
            name: 'down',
            keys: ['ArrowDown', 'KeyS'],
          },
          {
            name: 'right',
            keys: ['ArrowRight', 'KeyD'],
          },
          {
            name: 'left',
            keys: ['ArrowLeft', 'KeyA'],
          },
        ]}
      >
        <Canvas shadows>
          {/* <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [position.x, position.y, position.z],
        }}
      > */}
          <PerspectiveCamera
            makeDefault
            // position={[0, 2, 12.5]}
            position={[position.x, position.y, position.z]}
          />
          {/* <OrbitControls makeDefault /> */}
          {/* <color args={[controls.color]} attach={'background'} /> */}
          <color args={['#252731']} attach={'background'} />
          <Lights />
          <Physics>
            {/* <Debug /> */}
            <Journey />
            <Movement />
          </Physics>
        </Canvas>
      </KeyboardControls>
    </>
  );
};

export default Experience;
