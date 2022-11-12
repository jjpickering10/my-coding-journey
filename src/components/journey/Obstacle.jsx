import { Center, Text3D, useMatcapTexture } from '@react-three/drei';
import React from 'react';
import font from 'three/examples/fonts/helvetiker_bold.typeface.json';

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
    // <Center
    //   right={index % 2 === 0 ? false : true}
    //   left={index % 2 === 0 ? true : false}
    //   top
    // >
    <Text3D
      letterSpacing={-0.2}
      position={position}
      rotation-y={index % 2 === 0 ? Math.PI / 3 : -Math.PI / 3}
      castshadow
      receiveShadow
      font={font}
      material={material}
      size={2.5}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.5}
      bevelSize={0.15}
      bevelSegments={16}
      bevelOffset={0}
    >
      {text}
      {/* <meshStandardMaterial matcap={matcapTexture} /> */}
      {/* <meshMatcapMaterial matcap={matcapTexture} /> */}
    </Text3D>
    // </Center>
  );
};

export default Obstacle;
