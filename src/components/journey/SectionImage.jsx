import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { vertex, fragment } from '../../shaders/shader';

const SectionImage = ({ image, index }) => {
  console.log(index);
  const ref = useRef();
  useFrame((state) => {
    ref.current.uniforms.uTime.value = state.clock.elapsedTime;
  }, []);
  return (
    <>
      <RigidBody restitution={0.2} friction={2}>
        <mesh
          position={[0, 15, -20]}
          receiveShadow
          // geometry={boxGeometry}
          // material={floorMaterial}
          // scale={scale}
        >
          <planeGeometry args={[20 * 2.03389831, 20, 64, 64]} />
          {/* <meshStandardMaterial map={image} /> */}
          <shaderMaterial
            ref={ref}
            vertexShader={vertex}
            fragmentShader={fragment}
            uniforms={{
              uTexture: {
                value: image,
              },
              uTime: {
                value: 0,
              },
              uIndex: {
                value: index % 2 === 0 ? 1 : 2,
              },
            }}
          />
        </mesh>
      </RigidBody>
      <RigidBody type='fixed' restitution={0.2} friction={2}>
        <mesh
          position={[0, 15, -20.001]}
          rotation-y={Math.PI}
          receiveShadow
          // geometry={boxGeometry}
          // material={floorMaterial}
          // scale={scale}
        >
          <planeGeometry args={[20 * 2.03389831, 20]} />
          {/* <meshStandardMaterial map={image} /> */}
          <shaderMaterial
            vertexShader={vertex}
            fragmentShader={fragment}
            uniforms={{
              uTexture: {
                value: image,
              },
              uTime: {
                value: 0,
              },
            }}
          />
        </mesh>
      </RigidBody>
    </>
  );
};

export default SectionImage;
