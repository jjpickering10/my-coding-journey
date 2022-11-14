import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const Movement = () => {
  const movementBall = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const [rotationY, setRotationY] = useState(0);

  useFrame((state, delta) => {
    // Control the movement

    const { up, down, right, left, leftRotate, rightRotate } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };

    const impulseStrength = 20 * delta;

    if (leftRotate) {
      setRotationY((prevRotation) => (prevRotation += impulseStrength * 0.1));
    }
    if (rightRotate) {
      setRotationY((prevRotation) => (prevRotation -= impulseStrength * 0.1));
    }
    const cameraQuaternion = new THREE.Quaternion();
    cameraQuaternion.setFromEuler(new THREE.Euler(0, rotationY, 0));
    movementBall.current.setRotation(cameraQuaternion);

    const x = gsap.utils.mapRange(
      0,
      1,
      1,
      -1,
      Math.abs(movementBall.current.rotation().y)
    );

    if (up) {
      impulse.z -= impulseStrength * x;
      movementBall.current.rotation().y > 0
        ? (impulse.x += impulseStrength * (Math.abs(x) - 1))
        : (impulse.x -= impulseStrength * (Math.abs(x) - 1));
    }
    if (down) {
      impulse.z += impulseStrength * x;
      movementBall.current.rotation().y > 0
        ? (impulse.x -= impulseStrength * (Math.abs(x) - 1))
        : (impulse.x += impulseStrength * (Math.abs(x) - 1));
    }
    if (right) {
      impulse.x += impulseStrength * x;
      movementBall.current.rotation().y > 0
        ? (impulse.z += impulseStrength * (Math.abs(x) - 1))
        : (impulse.z -= impulseStrength * (Math.abs(x) - 1));
    }
    if (left) {
      impulse.x -= impulseStrength * x;
      movementBall.current.rotation().y > 0
        ? (impulse.z -= impulseStrength * (Math.abs(x) - 1))
        : (impulse.z += impulseStrength * (Math.abs(x) - 1));
    }

    movementBall.current.applyImpulse(impulse);

    // Control the camera

    const movementPosition = movementBall.current.translation();
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(movementPosition);
    cameraPosition.z += 0;
    cameraPosition.y += 2.5;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(movementPosition);
    cameraTarget.y += 1;

    state.camera.matrix.makeRotationFromQuaternion(cameraQuaternion);
    state.camera.matrixAutoUpdate = false;
    state.camera.matrix.setPosition(cameraPosition);
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(cameraTarget);
  });
  return (
    <RigidBody
      ref={movementBall}
      colliders={'ball'}
      restitution={0.2}
      friction={1}
      linearDamping={2}
      angularDamping={2}
    >
      <mesh>
        <sphereGeometry args={[0.5, 64, 64]} />
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
