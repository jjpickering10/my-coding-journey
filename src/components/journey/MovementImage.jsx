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

   // -------
	// newPos.y += sin(uTime * uIndex) * 0.5;
	// newPos.y += sin(vUv.x * PI) * 2.5;
	// newPos.z -= sin(uTime * uIndex) * 0.5;
	// newPos.z += sin(vUv.y * PI) * 2.5;

  // -------


	// float freq = 1.5;
	// float amp = 1.25;
	// vec3 noisePos = vec3(newPos.x , newPos.y, newPos.z + PI * 0.02);
	// newPos.z += snoise3(noisePos) * sin(uTime);
	// float dist = length(0.5 - vUv);
	// float waves = sin(vUv.y * 5. * (1.));
    // newPos.x -= sin(dist * PI + PI / 2. + waves + uTime) * ((1.) * (10. * (1. - (2.))));
	gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
}
  `,
  // fragment shader
  glsl`
    varying vec2 vUv;
uniform sampler2D uTexture0;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uTexture3;
uniform sampler2D uTexture4;
uniform sampler2D uTexture5;
uniform sampler2D uTexture6;
uniform sampler2D uTexture7;
uniform sampler2D uTexture8;
uniform float uCurrentIndex;
uniform float uTime;
void main() {

	float dist = 1. - length(0.5 - vUv);
	
	vec4 texture0 = texture2D(uTexture0, vUv);
	vec4 texture1 = texture2D(uTexture1, vUv);
	vec4 final = mix(texture0, texture1, uCurrentIndex);
	gl_FragColor = texture0;
	// gl_FragColor = final * pow(dist, 0.2);
}
  `
);

extend({ MyMovementShader });

const MovementImage = ({ images, index }) => {
  const { rotation } = useControls({
    rotation: {
      value: {
        x: -1.1,
        y: 5,
        z: 18,
      },
      step: 0.01,
    },
  });
  console.log('sectionImage');
  const globalPosition = useJourney((state) => state.positionZ);
  const currentSection = useJourney((state) => state.section);
  const currentTexture = useJourney((state) => state.texture);
  const movementBall = useRef();
  const ref = useRef();
  const meshRef = useRef();
  const ref2 = useRef();
  const meshRef2 = useRef();
  useFrame((state) => {
    ref.current.uniforms.uTime.value = state.clock.elapsedTime;
    ref.current.uniforms.uTexture0.value = images[currentTexture];

    meshRef.current.position.z = globalPosition + 80;
  });

  return (
    <>
      <mesh
        ref={meshRef}
        position={[0, 0.1, -20]}
        rotation-x={-Math.PI / 2}
        receiveShadow
      >
        <planeGeometry args={[40 * 2.03389831, 40, 64, 64]} />
        <myMovementShader
          ref={ref}
          uTexture={images[currentTexture]}
          uTime={1}
          uIndex={index % 2 === 0 ? 1 : 2}
        />
      </mesh>
      {/* <mesh
        ref={meshRef2}
        position={[0, -40, -20]}
        rotation-x={-Math.PI / 2}
        // rotation-y={Math.PI}
        receiveShadow
      >
        <planeGeometry args={[80 * 2.03389831, 80, 64, 64]} />
        <myShader
          ref={ref2}
          uTexture={images[currentTexture]}
          uTime={1}
          uIndex={index % 2 === 0 ? 1 : 2}
        />
      </mesh> */}
    </>
  );
};

export default MovementImage;
