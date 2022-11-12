import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import React, { useRef, useState } from 'react';
import * as THREE from 'three';

const Movement = () => {
  const movementBall = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  //   const [rotationY, setRotationY] = useState(0);
  //   const [positionY, setPositionY] = useState(0);

  useFrame((state, delta) => {
    // Control the movement

    const { up, down, right, left } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 10 * delta;
    const torqueStrength = 10 * delta;

    if (up) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
      //   setPositionY((prevPosition) => (prevPosition -= impulseStrength));
    }
    if (down) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
      // setRotationY((prevRotation) => (prevRotation -= impulseStrength));
    }
    if (right) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    if (left) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    movementBall.current.applyImpulse(impulse);
    movementBall.current.applyTorqueImpulse(torque);

    // Control the camera

    const movementPosition = movementBall.current.translation();
    // console.log(movementPosition);
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(movementPosition);
    cameraPosition.z += 5;
    cameraPosition.y += 1;

    // const cameraQuaternion = new THREE.Quaternion();
    // cameraQuaternion.setFromEuler(new THREE.Euler(0, rotationY, 0));
    // movementBall.current.setNextKinematicRotation(cameraQuaternion);
    // const movementRotation = movementBall.current.rotation();

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(movementPosition);
    cameraTarget.y += 1;

    // state.camera.matrix.makeRotationFromQuaternion(cameraQuaternion);
    // state.camera.matrixAutoUpdate = false;
    // state.camera.matrix.setPosition(cameraPosition);
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(cameraTarget);
  });
  return (
    <RigidBody
      //   type='kinematicPosition'
      ref={movementBall}
      colliders={'ball'}
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={'red'}
          opacity={0}
          transparent
          wireframe
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
    </RigidBody>
  );
};

export default Movement;
