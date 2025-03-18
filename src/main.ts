import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { createD20, addDice, removeDice } from "./dice";
import { createSky } from "./sky";
import { createMainCamera } from "./camera";

const sizes = {
  height: window.innerHeight,
  width: window.innerWidth,
};

const gui = new GUI();
const scene = new THREE.Scene();

const sky = createSky();
scene.add(sky);

const canvas = document.getElementById("webgl-canva");
const createDiceButton = document.getElementById("create-dice");
const amountDiceButton = document.getElementById("amount-dice");

const addDiceButton = document.getElementById("add-dice");
const removeDiceButton = document.getElementById("remove-dice");

createDiceButton?.addEventListener("click", () => {
  createD20(scene, amountDiceButton);
});
removeDiceButton?.addEventListener("click", () => removeDice(amountDiceButton));
addDiceButton?.addEventListener("click", () => addDice(amountDiceButton));

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(2000, 2000),
  new THREE.MeshStandardMaterial({ color: "#B7C0EE" })
);

floor.rotation.x = -Math.PI * 0.5;

scene.add(floor);

const camera = createMainCamera(sizes);
scene.add(camera);

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
