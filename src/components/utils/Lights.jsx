import React from 'react';

const Lights = () => {
  return (
    <>
      <directionalLight
        // color={'#ffffff'}
        castShadow
        position={[4, 4, 1]}
        intensity={2}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <directionalLight
        // color={'#ffffff'}
        castShadow
        position={[-4, 4, 1]}
        intensity={2}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={1} />
      {/* <ambientLight intensity={1} color={'#000000'} /> */}
    </>
  );
};

export default Lights;
