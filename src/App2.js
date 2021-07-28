import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App2.css';

// ===> Think about custom hook / call for id
// ie. const bg = React.createElement() || .createRef();


// 1. SCENE == container
const scene = new THREE.Scene();

// 2. CAMERA
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// 3. RENDERER == makes the magic happen ( to render out the actual graphics to the scene )
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

// Now add an object to it
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );

// Then the material to the object
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );

// Then creating the mesh = geometry + material
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

// instantiate Lighting here
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render( scene, camera );
};

animate();

const App2 = () => {
    return (
      <div>
        <canvas id="bg">
        </canvas> 
      </div>
    )
}

export default App2;
