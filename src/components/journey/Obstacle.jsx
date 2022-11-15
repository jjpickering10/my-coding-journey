import { Center, Text3D, useMatcapTexture } from '@react-three/drei';
import { CuboidCollider, RigidBody, useRapier } from '@react-three/rapier';
import React, { useEffect, useRef } from 'react';
import font from 'three/examples/fonts/helvetiker_bold.typeface.json';
import * as THREE from 'three';

const Obstacle = ({
  position,
  rotation,
  geometry,
  material,
  scale,
  text,
  index,
}) => {
  const [matcapTexture] = useMatcapTexture('0A0A0A_A9A9A9_525252_747474', 256);
  const ref = useRef();
  const cuboidRef = useRef();
  const { rapier } = useRapier();
  useEffect(() => {
    if (ref.current && cuboidRef.current[0]) {
      ref.current.geometry.computeBoundingBox();
      ref.current.geometry.translate(
        -ref.current.geometry.boundingBox.max.x / 2,
        0,
        0
      );
      const x = new rapier.Cuboid(
        ref.current.geometry.boundingBox.max.x,
        ref.current.geometry.boundingBox.max.y,
        ref.current.geometry.boundingBox.max.z
      );
      cuboidRef.current[0].setShape(x);
    }
  });
  return (
    // <mesh
    //   geometry={geometry}
    //   position={position}
    //   rotation-y={rotation}
    //   material={material}
    //   scale={scale}
    //   castShadow
    //   receiveShadow
    // />
    <RigidBody
      rotation-y={index % 2 === 0 ? Math.PI / 3 : -Math.PI / 3}
      position={[position[0], position[1], position[2]]}
      type='fixed'
      colliders={false}
      restitution={1}
      friction={10}
    >
      <CuboidCollider
        // position={[position[0], position[1], position[2]]}
        ref={cuboidRef}
        args={[1, 0.5, 2]}
      />
      <Text3D
        ref={ref}
        letterSpacing={-0.2}
        // castshadow
        // receiveShadow
        font={font}
        material={material}
        size={5}
        name={'text'}
        curveSegments={12}
        bevelEnabled
        bevelThickness={1}
        bevelSize={0.15}
        bevelSegments={16}
        bevelOffset={0}
      >
        {text}
        {/* <meshStandardMaterial matcap={matcapTexture} /> */}
        {/* <meshMatcapMaterial matcap={matcapTexture} /> */}
      </Text3D>
    </RigidBody>
  );
};

export default Obstacle;
