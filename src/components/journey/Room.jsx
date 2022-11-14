import React from 'react';
import RoomImage from './RoomImage';

const Room = ({
  position = [0, 0, 4],
  boxGeometry,
  floorMaterial,
  scale,
  meshPosition,
  roomImages,
  left,
}) => {
  console.log(left);
  const roomPlanes = roomImages.map((image, index) => {
    return <RoomImage index={index} left={left} />;
  });
  return (
    <>
      <group position={position}>
        <mesh
          position={meshPosition}
          receiveShadow
          geometry={boxGeometry}
          material={floorMaterial}
          scale={scale}
        />
        {roomPlanes}
      </group>
    </>
  );
};

export default Room;
