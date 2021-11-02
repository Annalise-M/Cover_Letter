
import * as THREE from 'three';
import Standard_CoverLetter from '../src/images/Standard_CoverLetter.jpg';
// import glsl from 'babel-plugin-glsl/macro';
//import { Canvas } from '@react-three/fiber';

//  Scene
const scene = new THREE.Scene();

// Red cube
//const textureImage = require([Standard_CoverLetter]);
const texture = new THREE.TextureLoader().load([Standard_CoverLetter]);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh1 = new THREE.Mesh(geometry, material)
;
scene.add(mesh1);

// Sizes
const sizes = {
  width: 800,
  height: 600
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height );

scene.add(camera);

// Renderer
const canvas = document.querySelector('canvas.webgl');

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.length)
renderer.render(scene, camera)

export const ThreejsJourny = () => {
  return (
    <div>
      <canvas className="webgl" >

      </canvas>
    </div>
  )
}

module.exports = ThreejsJourny;