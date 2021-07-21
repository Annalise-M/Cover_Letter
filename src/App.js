import * as THREE from 'three';
import React, { useRef, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro';
import './App.css';

const WaveShaderMaterial = shaderMaterial(
  // Uniform {RGB = default setting @ black}
  { uTime: 0, 
    uColor: new THREE.Color(0.0, 0.0, 0.0) 
  },

  // Vertex Shader
  glsl`
    precision mediump float;
    varying vec2 vUv;

    void main() {
      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  // Fragment Shader
  glsl`
    precision mediump float;

    uniform vec3 uColor;
    uniform float uTime;
    
    varying vec2 vUv;

    void main() {
      gl_FragColor = vec4(sin(vUv.x + uTime) * uColor, 1.0);
    }
  `
);

// allows the WaveShaderMaterial as a jsx comonent
extend({ WaveShaderMaterial });

const Wave = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  return (
    <mesh>
      <planeBufferGeometry args={[3, 5]} />
      <waveShaderMaterial uColor={'hotpink'} ref={ref} />
    </mesh>
  )
}

const Scene = () => {
  return (
    <Canvas>
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
