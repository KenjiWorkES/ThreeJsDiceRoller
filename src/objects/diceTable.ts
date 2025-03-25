import * as THREE from "three";
import * as CANNON from "cannon-es";

import { GLTFLoader } from "three/examples/jsm/Addons.js";

const createDiceTableBody = (diceTable: THREE.Group) => {
  const floorShape = new CANNON.Plane();
  const wallShape = new CANNON.Box(new CANNON.Vec3(0.6, 5, 2));

  const diceTableBody = new CANNON.Body({
    mass: 0,
    shape: floorShape,
    position: new CANNON.Vec3(0, 0.3, 0),
  });

  diceTableBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0),
    Math.PI * 0.5
  );

  diceTableBody.addShape(
    wallShape,
    new CANNON.Vec3(12, 5, 0.7),
    new CANNON.Quaternion().setFromAxisAngle(
      new CANNON.Vec3(0, 0, -1),
      Math.PI * 0.87
    )
  );

  diceTableBody.addShape(
    wallShape,
    new CANNON.Vec3(-12, -5, 0.7),
    new CANNON.Quaternion().setFromAxisAngle(
      new CANNON.Vec3(0, 0, -1),
      Math.PI * 0.87
    )
  );

  diceTableBody.addShape(
    wallShape,
    new CANNON.Vec3(12, -5, 0.7),
    new CANNON.Quaternion().setFromAxisAngle(
      new CANNON.Vec3(0, 0, 1),
      Math.PI * 0.87
    )
  );

  diceTableBody.addShape(
    wallShape,
    new CANNON.Vec3(-12, 5, 0.7),
    new CANNON.Quaternion().setFromAxisAngle(
      new CANNON.Vec3(0, 0, 1),
      Math.PI * 0.87
    )
  );

  diceTableBody.addShape(
    wallShape,
    new CANNON.Vec3(5, 12.05, 0.7),
    new CANNON.Quaternion().setFromAxisAngle(
      new CANNON.Vec3(0, 0, 1),
      Math.PI * 0.38
    )
  );

  diceTableBody.addShape(
    wallShape,
    new CANNON.Vec3(-5, -12.05, 0.7),
    new CANNON.Quaternion().setFromAxisAngle(
      new CANNON.Vec3(0, 0, 1),
      Math.PI * 0.38
    )
  );

  diceTableBody.addShape(
    wallShape,
    new CANNON.Vec3(-5, 12.05, 0.7),
    new CANNON.Quaternion().setFromAxisAngle(
      new CANNON.Vec3(0, 0, -1),
      Math.PI * 0.38
    )
  );

  diceTableBody.addShape(
    wallShape,
    new CANNON.Vec3(5, -12.05, 0.7),
    new CANNON.Quaternion().setFromAxisAngle(
      new CANNON.Vec3(0, 0, -1),
      Math.PI * 0.38
    )
  );

  return diceTableBody;
};

export const createDiceTable = (scene: THREE.Scene, world: CANNON.World) => {
  const gtlfLoader = new GLTFLoader();
  gtlfLoader.load("/models/diceTable/scene.glb", (gtlf) => {
    const diceTable = gtlf.scene;
    console.log(diceTable);
    diceTable.scale.setScalar(500);
    diceTable.castShadow = true;
    diceTable.receiveShadow = true;

    const diceTableBody = createDiceTableBody(diceTable as THREE.Group);
    world.addBody(diceTableBody);
    scene.add(diceTable);
  });
};
