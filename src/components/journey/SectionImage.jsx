import { shaderMaterial, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { vertex, fragment } from '../../shaders/shader';
import useJourney from '../../stores/useJourney';
import { extend } from '@react-three/fiber';
import glsl from 'babel-plugin-glsl/macro';
import { useControls } from 'leva';

const SectionImage = ({ image, index }) => {
  const MyShader = shaderMaterial(
    { uTime: 0, uTexture0: null, uIndex: 0, uProgress: 1 },
    // vertex shader
    glsl`
#define PI 3.1415926535897932384626433832795
varying vec2 vUv;
uniform float uTime;
uniform float uIndex;
uniform float uProgress;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
void main() {
	vUv = uv;
	vec3 newPos = position;
  float dist = length(uProgress - length(vUv.y - 1.)) * -1.;
  newPos.z = (sin(dist * PI * 2.) * 5.) * uProgress * 0.1;
  newPos.y += (sin(uTime * uIndex) * 0.25);

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
// uniform float uCurrentIndex;
uniform float uTime;
#pragma glslify: vignette = require(glsl-vignette/advanced);
void main() {

  float square = smoothstep(0.495, 0.5, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

  float vignetteValue = vignette(vUv, vec2(0.25, 0.5), 1., 0.99);

	float dist = 1. - length(0.5 - vUv);
	
	vec4 texture0 = texture2D(uTexture0, vUv);
	// vec4 texture1 = texture2D(uTexture1, vUv);
	// vec4 final = mix(texture0, texture1, uCurrentIndex);
	// gl_FragColor = texture0;
  
	gl_FragColor = texture0 * vignetteValue;
	// gl_FragColor = vec4(vec3(texture0.r, texture0.g, texture0.b), (1. - pow(square, 10.)));
}
  `
  );

  extend({ MyShader });

  const currentSection = useJourney((state) => state.texture);

  const movementBall = useRef();
  const ref = useRef();
  const meshRef = useRef();
  const ref2 = useRef();
  const meshRef2 = useRef();
  useFrame((state) => {
    meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    meshRef2.current.material.uniforms.uTime.value = state.clock.elapsedTime;

    // console.log(ref.current.uniforms.uTime.value);
  }, []);

  const tl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        paused: true,
      });
      tl.current.to(meshRef.current.material.uniforms.uProgress, {
        value: 2,
        duration: 2,
      });
      tl.current.to(meshRef.current.material.uniforms.uProgress, {
        value: 1,
        duration: 2,
      });
    });
    if (currentSection === index) {
      tl.current.play();
    }

    return () => ctx.revert();
  }, [currentSection]);

  return (
    <>
      {/* <RigidBody restitution={0.2} friction={2}> */}
      <mesh ref={meshRef} position={[0, 15, -40]} receiveShadow>
        <planeGeometry args={[20 * 2.03389831, 20, 64, 64]} />

        <myShader
          attach={'material'}
          ref={ref}
          uTexture0={image}
          // uTime={1}
          uIndex={index % 2 === 0 ? 1 : 2}
        />
      </mesh>

      <mesh
        ref={meshRef2}
        position={[0, 15, -40.001]}
        rotation-y={Math.PI}
        receiveShadow
      >
        <planeGeometry args={[20 * 2.03389831, 20]} />
        <myShader
          attach={'material'}
          ref={ref2}
          uTexture0={image}
          // uTime={1}
          uIndex={index % 2 === 0 ? 1 : 2}
        />
      </mesh>
    </>
  );
};

export default SectionImage;
