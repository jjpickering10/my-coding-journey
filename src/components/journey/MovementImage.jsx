import { shaderMaterial, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { vertex, fragment } from '../../shaders/shader';
import useJourney from '../../stores/useJourney';
import { extend } from '@react-three/fiber';
import glsl from 'babel-plugin-glsl/macro';
import { useControls } from 'leva';

const MovementImage = ({ images, index }) => {
  const MyMovementShader = shaderMaterial(
    { uTime: 0, uTexture0: null, uIndex: 0 },
    // vertex shader
    glsl`
#define PI 3.1415926535897932384626433832795
varying vec2 vUv;
uniform float uTime;
uniform float uIndex;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);


void main() {
	vUv = uv;
	vec3 newPos = position;

  

	gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
}
  `,
    // fragment shader
    glsl`
    varying vec2 vUv;
uniform sampler2D uTexture0;
// uniform sampler2D uTexture1;
// uniform sampler2D uTexture2;
// uniform sampler2D uTexture3;
// uniform sampler2D uTexture4;
// uniform sampler2D uTexture5;
// uniform sampler2D uTexture6;
// uniform sampler2D uTexture7;
// uniform sampler2D uTexture8;
uniform float uCurrentIndex;
uniform float uTime;
float hash(vec2 p) {
  return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x))));
}
void main() {
  float noise = hash((vUv * ((uTime) ) * 5000.) - vec2(0.5)) * 0.2;
  gl_FragColor = vec4(vec3(noise), 1.);
}
  `
  );

  extend({ MyMovementShader });

  const currentTexture = useJourney((state) => state.texture);
  const ref = useRef();
  const meshRef = useRef();
  useFrame((state) => {
    ref.current.uniforms.uTime.value = state.clock.elapsedTime;
    // ref.current.uniforms.uTexture0.value = images[currentTexture];

    // meshRef.current.position.z = globalPosition + 80;
  });

  return (
    <>
      <mesh
        ref={meshRef}
        position={[0, 0.5, -320]}
        rotation-x={-Math.PI / 2}
        rotation-z={-Math.PI / 2}
        receiveShadow
      >
        <planeGeometry args={[400 * 2.03389831, 400, 64, 64]} />
        <myMovementShader
          ref={ref}
          uTexture={images[currentTexture]}
          uTime={1}
          uIndex={index % 2 === 0 ? 1 : 2}
        />
      </mesh>
    </>
  );
};

export default MovementImage;
