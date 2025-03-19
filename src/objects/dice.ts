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
      Number(amount) >= 8 ? 8 : Number(amount) + 1
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

export const createD20Body = async (diceMesh: THREE.Mesh) => {
  const diceShape = cannonU.CreateTriMesh(diceMesh, {
    x: 0.26,
    y: 0.26,
    z: 0.26,
  });

  const diceBody = new CANNON.Body({
    mass: 1,
    shape: diceShape,
    position: new CANNON.Vec3(
      diceMesh.position.x,
      diceMesh.position.y,
      diceMesh.position.z
    ),
    collisionFilterGroup: 1,
    collisionFilterMask: 1,
    type: 1,
  });

  diceBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    ),
    (Math.random() - 0.5) * 4 * Math.PI
  );

  diceBody.velocity = new CANNON.Vec3(
    (Math.random() - 0.5) * 6,
    0,
    (Math.random() - 0.5) * 6
  );

  diceBody.applyLocalImpulse(
    new CANNON.Vec3(
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5
    ),
    diceBody.position
  );

  return diceBody;
};

export const createD20 = async (
  scene: THREE.Scene,
  amountDiceButton: HTMLElement | null,
  world: CANNON.World,
  defaultMaterial: CANNON.Material
) => {
  const amount = Number(amountDiceButton?.innerHTML) || 1;
  let dices: { body: CANNON.Body; mesh: THREE.Mesh }[] = [];

  const result = await gtlfLoader.loadAsync("/d20_black/scene.gltf");
  const diceMesh =
    result.scene.children[0].children[0].children[0].children[0].children[0];

  for (let i = 0; i < amount; i++) {
    const diceClone = diceMesh.clone();
    diceClone.position.x = (Math.random() - 0.5) * 12;
    diceClone.position.z = (Math.random() - 0.5) * 12;
    diceClone.position.y = 12;

    diceClone.castShadow = true;
    diceClone.receiveShadow = true;
    scene.add(diceClone);

    const diceBody = await createD20Body(diceClone as THREE.Mesh);
    diceBody.material = defaultMaterial;

    world.addBody(diceBody);

    dices.push({ body: diceBody, mesh: diceClone as THREE.Mesh });
  }

  return dices;
};
