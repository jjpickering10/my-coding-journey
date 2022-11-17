import glsl from 'babel-plugin-glsl/macro';

const vertex = glsl`
#define PI 3.1415926535897932384626433832795
varying vec2 vUv;
uniform float uTime;
uniform float uIndex;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
void main() {
	vUv = uv;
	vec3 newPos = position;

	// --------
	// newPos.y += sin(uTime * uIndex) * 5.5;
	// newPos.y += sin(vUv.x * PI) * 2.5;
	// newPos.z -= sin(uTime * uIndex) * 0.5;
	// newPos.z += sin(vUv.y * PI) * 2.5;
	// --------


	// float freq = 1.5;
	// float amp = 1.25;
	// vec3 noisePos = vec3(newPos.x , newPos.y, newPos.z + PI * 0.02);
	// newPos.z += snoise3(noisePos) * sin(uTime);
	// float dist = length(0.5 - vUv);
	// float waves = sin(vUv.y * 5. * (1.));
    // newPos.x -= sin(dist * PI + PI / 2. + waves + uTime) * ((1.) * (10. * (1. - (2.))));
	gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
}`;

const fragment = glsl`
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
}`;

export { vertex, fragment };

// if (uCurrentIndex == 0.) {
// 	vec4 texture = texture2D(uTexture0, vUv);
// 	gl_FragColor = texture * pow(dist, 0.2);
// } else if (uCurrentIndex == 1.) {
// 	vec4 texture = texture2D(uTexture1, vUv);
// 	gl_FragColor = texture * pow(dist, 0.2);
// } else if (uCurrentIndex == 2.) {
// 	vec4 texture = texture2D(uTexture2, vUv);
// 	gl_FragColor = texture * pow(dist, 0.2);
// } else if (uCurrentIndex == 3.) {
// 	vec4 texture = texture2D(uTexture3, vUv);
// 	gl_FragColor = texture * pow(dist, 0.2);
// } else if (uCurrentIndex == 4.) {
// 	vec4 texture = texture2D(uTexture4, vUv);
// 	gl_FragColor = texture * pow(dist, 0.2);
// } else if (uCurrentIndex == 5.) {
// 	vec4 texture = texture2D(uTexture5, vUv);
// 	gl_FragColor = texture * pow(dist, 0.2);
// } else if (uCurrentIndex == 6.) {
// 	vec4 texture = texture2D(uTexture6, vUv);
// 	gl_FragColor = texture * pow(dist, 0.2);
// } else if (uCurrentIndex == 7.) {
// 	vec4 texture = texture2D(uTexture7, vUv);
// 	gl_FragColor = texture * pow(dist, 0.2);
// } else if (uCurrentIndex == 8.) {
// 	vec4 texture = texture2D(uTexture8, vUv);
// 	gl_FragColor = texture * pow(dist, 0.2);
// } else {
// }
