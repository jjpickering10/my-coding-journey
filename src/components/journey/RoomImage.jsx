import { RigidBody } from '@react-three/rapier';
import React from 'react';
import * as THREE from 'three';

const RoomImage = ({ index, left }) => {
  console.log(index);
  return (
    <RigidBody restitution={0.2} friction={2}>
      <mesh
        position-y={5}
        position-z={index !== 4 ? (index % 2 === 0 ? 19.5 : -19.5) : 0}
        position-x={
          (left ? index : -index) * (10 * 2.03389831) + (left ? -35 : 35)
        }
        rotation-y={index === 4 ? (left ? -Math.PI / 2 : Math.PI / 2) : 0}
        receiveShadow
        // geometry={boxGeometry}
        // material={floorMaterial}
        // scale={scale}
      >
        <planeGeometry args={[10 * 2.03389831, 10]} />
        <meshStandardMaterial side={THREE.DoubleSide} />
      </mesh>
    </RigidBody>
  );
};

export default RoomImage;
