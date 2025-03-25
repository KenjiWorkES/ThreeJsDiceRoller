import * as THREE from "three";
import * as CANNON from "cannon-es";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import {
  createDiceObj,
  createDices,
  createFloor,
  type DicesArray,
} from "./objects";
import { createSky } from "./sky";
import { createMainCamera } from "./camera";
import { createSceneLights } from "./lights";
import { createDefaultContactMaterial } from "./physics";
//import CannonDebugger from "cannon-es-debugger";

let allDices: DicesArray = [];

const openButon = document.getElementById("open");
const closeButon = document.getElementById("close");

const fieldType = document.getElementById("field-type");
const fieldAmount = document.getElementById("field-amount");
const fieldDice = document.getElementById("field-dice");

createDiceObj();

openButon?.addEventListener("click", () => {
  if (closeButon && openButon && fieldType && fieldAmount && fieldDice) {
    closeButon.style.display = "block";
    openButon.style.display = "none";

    fieldDice.style.display = "block";
    fieldAmount.style.display = "block";
    fieldType.style.display = "block";
  }
});

closeButon?.addEventListener("click", () => {
  if (closeButon && openButon && fieldType && fieldAmount && fieldDice) {
    openButon.style.display = "block";
    closeButon.style.display = "none";

    fieldDice.style.display = "none";
    fieldAmount.style.display = "none";
    fieldType.style.display = "none";
  }
});

const sizes = {
  height: window.innerHeight,
  width: window.innerWidth,
};

const [defaultMaterial, defaultContactMaterial] =
  createDefaultContactMaterial();

const gui = new GUI({
  width: 400,
});

gui.hide();

if (window.location.hash) {
  gui.show();
}

const scene = new THREE.Scene();
const world = new CANNON.World();
//const cannonDebugger = new CannonDebugger(scene, world);

world.gravity.set(0, -9.82, 0);
world.addContactMaterial(defaultContactMaterial);
world.defaultContactMaterial = defaultContactMaterial;
world.allowSleep = true;

const sky = createSky();
scene.add(sky);

const canvas = document.getElementById("webgl-canva");
const createDiceButton = document.getElementById("create-dice");

createDiceButton?.addEventListener("click", async () => {
  const amount = document.querySelector(
    'input[name="amount"]:checked'
  ) as HTMLInputElement;

  if (allDices.length > 0) {
    allDices.forEach((dice) => {
      scene.remove(dice.mesh);
      world.removeBody(dice.body);
    });
  }
  const dices = await createDices(
    scene,
    Number(amount.value),
    world,
    defaultMaterial
  );

  allDices = dices;
});

const [floorMesh, floorBody] = createFloor(gui);

scene.add(floorMesh);
world.addBody(floorBody);

const camera = createMainCamera(sizes, gui);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enableDamping = true;

const [ambientLight, directionalLight] = createSceneLights(gui);

scene.add(ambientLight);
scene.add(directionalLight);

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

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.render(scene, camera);

const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  for (const dice of allDices) {
    dice.mesh.position.y = dice.body.position.y;
    dice.mesh.position.x = dice.body.position.x;
    dice.mesh.position.z = dice.body.position.z;
    dice.mesh.quaternion.copy(dice.body.quaternion);
  }

  //update world
  world.step(1 / 60, deltaTime, 3);

  // Update controls
  controls.update();
  //cannonDebugger.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
