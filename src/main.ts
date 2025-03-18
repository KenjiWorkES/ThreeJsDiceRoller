import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { createD20 } from "./dice";

const sizes = {
  height: window.innerHeight,
  width: window.innerWidth,
};

const gui = new GUI();
const scene = new THREE.Scene();

const canvas = document.getElementById("webgl-canva");
const createDiceButton = document.getElementById("create-dice");
const amountDiceButton = document.getElementById("amount-dice");

createDiceButton?.addEventListener("click", () => {
  const amount = amountDiceButton?.innerHTML;
  createD20(scene, Number(amount) || 1);
});

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: "#B7C0EE" })
);

floor.rotation.x = -Math.PI * 0.5;

scene.add(floor);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
camera.position.set(1, 2, 2);
camera.lookAt(floor.position);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const renderer = new THREE.WebGLRenderer({
  canvas: canvas as HTMLCanvasElement,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.render(scene, camera);

const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
