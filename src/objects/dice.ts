import * as THREE from "three";
import * as CANNON from "cannon-es";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import cannonU from "cannon-utils";

export type DicesArray = {
  body: CANNON.Body;
  mesh: THREE.Mesh;
}[];

const gtlfLoader = new GLTFLoader();

export const addDice = (amountDiceButton: HTMLElement | null) => {
  if (amountDiceButton) {
    const amount = amountDiceButton?.innerHTML;
    amountDiceButton.innerHTML = (
      Number(amount) >= 10 ? 10 : Number(amount) + 1
    ).toString();
  }
};

export const removeDice = (amountDiceButton: HTMLElement | null) => {
  if (amountDiceButton) {
    const amount = amountDiceButton?.innerHTML;
    amountDiceButton.innerHTML = (
      Number(amount) <= 1 ? 1 : Number(amount) - 1
    ).toString();
  }
};

export const createD20Body = (diceMesh: THREE.Mesh) => {
  console.log(diceMesh.geometry.boundingBox);
  const diceShape = cannonU.CreateTriMesh(diceMesh, {
    x: 0.25,
    y: 0.25,
    z: 0.25,
  });
  const diceBody = new CANNON.Body({
    mass: 1,
    shape: diceShape,
    position: new CANNON.Vec3(
      diceMesh.position.x,
      diceMesh.position.y,
      diceMesh.position.z
    ),
  });

  diceBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    ),
    (Math.random() - 0.5) * 4 * Math.PI
  );

  return diceBody;
};

export const createD20 = async (
  scene: THREE.Scene,
  amountDiceButton: HTMLElement | null,
  world: CANNON.World
) => {
  const amount = Number(amountDiceButton?.innerHTML) || 1;
  let dices: { body: CANNON.Body; mesh: THREE.Mesh }[] = [];

  for (let i = 0; i < amount; i++) {
    const result = await gtlfLoader.loadAsync("/d20_black/scene.gltf");
    console.log(result);
    const diceMesh =
      result.scene.children[0].children[0].children[0].children[0].children[0];
    diceMesh.position.x = (Math.random() - 0.5) * 12;
    diceMesh.position.z = (Math.random() - 0.5) * 12;
    diceMesh.position.y = 10;

    diceMesh.castShadow = true;
    diceMesh.receiveShadow = true;
    scene.add(diceMesh);

    const diceBody = createD20Body(diceMesh as THREE.Mesh);
    world.addBody(diceBody);

    dices.push({ body: diceBody, mesh: diceMesh as THREE.Mesh });
  }

  return dices;
};
