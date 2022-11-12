import React from 'react';

const SectionImage = ({ image }) => {
  console.log(image);
  return (
    <>
      <mesh
        position={[0, 5, 0]}
        receiveShadow
        // geometry={boxGeometry}
        // material={floorMaterial}
        // scale={scale}
      >
        <planeGeometry args={[10 * 2.03389831, 10]} />
        <meshStandardMaterial map={image} />
      </mesh>
    </>
  );
};

export default SectionImage;
