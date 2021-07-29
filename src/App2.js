import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App2.css';
import hero1 from './images/hero1.jpeg';


// 1. SCENE == container
const scene = new THREE.Scene();

// CANVAS ???

// 2. CAMERA
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// 3. RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Object 
const geometry = new THREE.PlaneGeometry( 22, 30, 22, 22 );

// Material to the object
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );

// Mesh = geometry + material
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);


// Lighting - instantiated here
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);


// Controls
const controls = new OrbitControls(camera, renderer.domElement);

function addStars() {
  const geometry = new THREE.SphereGeometry(0.23, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff });
  const star = new THREE.Mesh( geometry, material );

  // positioning of objs
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStars);

const spaceTexture = new THREE.TextureLoader().load(hero1);
scene.background = spaceTexture;


// CAMERA
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  // obj.rotation.x += ;
  // obj.rotation.y += ;
  // obj.rotation.z += ;

  // otherObj.rotation.x += ;
  // otherObj.rotation.y += ;
  // otherObj.rotation.z += ;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
};

scene.add(moveCamera);

// Animate function needed for stopping obj movement based off of users click.e ===> .update || .stopAllAction(): AnimationMixer

// Animate
function animate() {
  requestAnimationFrame( animate );

  // if (animate === true) {
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    // controls.addEventListener();
    controls.update();
  // } else {
    // torus.rotation.x += 0.0;
    // torus.rotation.y += 0.0;
    // torus.rotation.z += 0.0;
  
    // controls.update();
  // }

  renderer.render( scene, camera );
};

animate();

const App2 = () => {
    return (
      <div>
        <canvas 
        // value="animate"
          
        id="bg">
        </canvas> 
      </div>
    )
}

export default App2;
