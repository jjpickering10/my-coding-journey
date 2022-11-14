import { RigidBody } from '@react-three/rapier';
import React from 'react';
import * as THREE from 'three';

const SectionImage = ({ image }) => {
  return (
    <>
      <RigidBody restitution={0.2} friction={2}>
        <mesh
          position={[0, 5, -20]}
          receiveShadow
          // geometry={boxGeometry}
          // material={floorMaterial}
          // scale={scale}
        >
          <planeGeometry args={[10 * 2.03389831, 10]} />
          <meshStandardMaterial map={image} />
        </mesh>
      </RigidBody>
      <RigidBody type='fixed' restitution={0.2} friction={2}>
        <mesh
          position={[0, 5, -20.001]}
          rotation-y={Math.PI}
          receiveShadow
          // geometry={boxGeometry}
          // material={floorMaterial}
          // scale={scale}
        >
          <planeGeometry args={[10 * 2.03389831, 10]} />
          <meshStandardMaterial map={image} />
        </mesh>
      </RigidBody>
    </>
  );
};

export default SectionImage;
