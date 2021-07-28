import * as THREE from 'three';
import React, { useRef, Suspense } from 'react';
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro';
import CoverLetter from './images/Standard_CoverLetter.jpg';
import './App.scss';
// import { PerspectiveCamera } from 'three';


export const WaveShaderMaterial = shaderMaterial(
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
      float noiseFreq = 1.8;
      float noiseAmp = 0.4;
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
      pos.z += snoise3(noisePos) * noiseAmp;
      vWave = pos.z;

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
    varying float vWave;

  // vWave ++ || -- Wave Frequencies Control here
    void main() {
      float wave = vWave * 0.2;
      vec3 texture = texture2D(uTexture, vUv + wave).rgb;
      gl_FragColor = vec4(texture, 1.0);
    }
  `
);

// allows WaveShaderMaterial to extend as a JSX comonent
extend({ WaveShaderMaterial });

const Wave = () => {
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize( window.innerWidth, window.innerHeight );
  // document.body.appendChild( renderer.domElement );
  
  const scene = new THREE.Scene();


  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
  // camera.position.z = 5;
  // camera.position.y = 0.7;
  // camera.position.x = 0.7;

  const renderer = new THREE.WebGLRenderer();

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.position.setZ(30);

  renderer.render( scene, camera );

  const animate = function () {
    requestAnimationFrame(animate);
    WaveShaderMaterial.rotation.x += 0.01;
    WaveShaderMaterial.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();
  
  
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const mesh = new THREE.Mesh();
  // const mesh = useRef();
  // useFrame(() => (mesh.current.position.x = mesh.current.position.y));

  const [image] = useLoader(THREE.TextureLoader, [CoverLetter],
  );


  scene.add(mesh);
  

  return (
    <camera makeDefault>
      <mesh>
        <planeBufferGeometry args={[0.4, 0.6, 16, 16]} />
        <waveShaderMaterial uColor={'hotpink'} ref={ref} uTexture={image}/>
      </mesh>
    </camera>
  )
}

const Scene = () => {
  return (
    // fov = field of position
    <Canvas camera={{ 
      fov: 7.7, 
      position: [0, 0, 3],
    }}>
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </Canvas>
  );
};


const App = () => {
  return (
   <>
    <h1>WELCOME TO MY COVER LETTER</h1>
    <Scene />
   </>
  );
};

export default App;
