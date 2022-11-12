import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import React, { useRef } from 'react';

const Movement = () => {
  const movementBall = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    const { up, down, right, left } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 2 * delta;
    const torqueStrength = 1 * delta;

    if (up) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (down) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
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
  });
  return (
    <RigidBody
      ref={movementBall}
      colliders={'ball'}
      restitution={0.2}
      friction={1}
    >
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color={'red'} />
      </mesh>
    </RigidBody>
  );
};

export default Movement;
