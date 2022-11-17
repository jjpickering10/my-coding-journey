import { useTexture } from '@react-three/drei';
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
  const roomPlanes = roomImages.map((image, index) => {
    const roomImage = useTexture(image.image);
    return (
      <RoomImage key={index} image={roomImage} index={index} left={left} />
    );
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
