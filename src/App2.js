import React from 'react';
import * as THREE from 'three';
import './App2.css';

// ===> Think about custom hook / call for id
// const bg = React.createElement();

// 1. SCENE == container
// 2. CAMERA
// 3. RENDERER == makes the magic happen ( to render out the actual graphics to the scene )

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

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
pointLight.position.set(20, 20, 20);

scene.add(pointLight);

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render( scene, camera );
};

animate();
// renderer.render( scene, camera );

const App2 = () => {
    return (
      <div>
        <canvas id="bg">
        </canvas> 
      </div>
    )
}

export default App2;
