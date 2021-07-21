import * as THREE from 'three';
import React, { useRef, Suspense } from 'react';
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro';
import './App.css';
import ResumeMap from './images/AM_Resume.png';

const WaveShaderMaterial = shaderMaterial(
  // Uniform {RGB = default setting @ black}
  { uTime: 0, 
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
  },

  // Vertex Shader
  glsl`
    precision mediump float;

    varying vec2 vUv;
    varying float vWave;

    uniform float uTime;

    #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);


    void main() {
      vUv = uv;

      vec3 pos = position;
      float noiseFreq = 1.5;
      float noiseAmp = 0.55;
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
      pos.z += snoise3(noisePos) * noiseAmp;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,

  // Fragment Shader
  glsl`
    precision mediump float;

    uniform vec3 uColor;
    uniform float uTime;
    uniform sampler2D uTexture;
    
    varying vec2 vUv;

    void main() {
      vec3 texture = texture2D(uTexture, vUv).rgb;
      gl_FragColor = vec4(texture, 1.0);
    }
  `
);

// allows the WaveShaderMaterial as a jsx comonent
extend({ WaveShaderMaterial });

const Wave = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, [ResumeMap]);

  return (
    <mesh>
      <planeBufferGeometry args={[0.4, 0.6, 16, 16]} />
      <waveShaderMaterial uColor={'hotpink'} ref={ref} uTexture={image}/>
    </mesh>
  )
}

const Scene = () => {
  return (
    // fov = field of position
    <Canvas camera={{ fov: 7, position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        <Wave />
      </Suspense>

    </Canvas>
  );
};

const App = () => {
  return (
    <Scene /> 
  );
};

export default App;
