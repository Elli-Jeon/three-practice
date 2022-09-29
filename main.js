// @ts-nocheck
import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/*
1. SCENE == container
2. CAMERA
3. RENDERER

// object
1. geometry
2. material
3. mesh (geometry + mesh)

+ 
texture
light
*/

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// add object

// 1. geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// 2. material
const material = new THREE.MeshStandardMaterial({ color: "red" });
// 3. mesh
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// controls
const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xfffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

const jeffTexture = new THREE.TextureLoader().load("jeff.png");
const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: jeffTexture })
);

scene.add(jeff);

const moonTexture = new THREE.TextureLoader().load("moon.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(10, 100, 100),
  new THREE.MeshStandardMaterial({ map: moonTexture })
);

scene.add(moon);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
