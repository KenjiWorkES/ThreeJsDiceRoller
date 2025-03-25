import * as THREE from "three";
import * as CANNON from "cannon-es";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import cannonU from "cannon-utils";

export type DicesArray = {
  body: CANNON.Body;
  mesh: THREE.Mesh;
}[];

export type Dice = THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;

export type DicesAndShapesType = {
  [key: string]: {
    [key: string]: {
      mesh: Dice;
    };
  };
};

let dicesAndShapes: DicesAndShapesType = {};

export const createDiceObj = async () => {
  const gtlfLoader = new GLTFLoader();
  const redDices = await gtlfLoader.loadAsync("/models/red_dices/scene.glb");
  const yellowDices = await gtlfLoader.loadAsync(
    "/models/yellow_dices/scene.glb"
  );
  const purpleDices = await gtlfLoader.loadAsync(
    "/models/purple_dices/scene.glb"
  );

  dicesAndShapes = {
    red: {
      d4: {
        mesh: redDices.scene.children[0] as Dice,
      },
      d6: {
        mesh: redDices.scene.children[1] as Dice,
      },
      d8: {
        mesh: redDices.scene.children[2] as Dice,
      },
      d10: {
        mesh: redDices.scene.children[3] as Dice,
      },
      d12: {
        mesh: redDices.scene.children[4] as Dice,
      },
      d20: {
        mesh: redDices.scene.children[5] as Dice,
      },
    },
    yellow: {
      d4: {
        mesh: yellowDices.scene.children[0] as Dice,
      },
      d6: {
        mesh: yellowDices.scene.children[1] as Dice,
      },
      d8: {
        mesh: yellowDices.scene.children[2] as Dice,
      },
      d10: {
        mesh: yellowDices.scene.children[3] as Dice,
      },
      d12: {
        mesh: yellowDices.scene.children[4] as Dice,
      },
      d20: {
        mesh: yellowDices.scene.children[5] as Dice,
      },
    },
    purple: {
      d4: {
        mesh: purpleDices.scene.children[0] as Dice,
      },
      d6: {
        mesh: purpleDices.scene.children[1] as Dice,
      },
      d8: {
        mesh: purpleDices.scene.children[2] as Dice,
      },
      d10: {
        mesh: purpleDices.scene.children[3] as Dice,
      },
      d12: {
        mesh: purpleDices.scene.children[4] as Dice,
      },
      d20: {
        mesh: purpleDices.scene.children[5] as Dice,
      },
    },
  };
};

/*function getPolyhedronShape(mesh: THREE.Mesh) {
  let geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", mesh.geometry.getAttribute("position"));

  geometry = BufferGeometryUtils.mergeVertices(geometry);

  const position = geometry.attributes.position.array;
  const index = geometry.index.array;

  const points = [];
  for (let i = 0; i < position.length; i += 3) {
    points.push(new CANNON.Vec3(position[i], position[i + 1], position[i + 2]));
  }
  const faces = [];
  for (let i = 0; i < index.length; i += 3) {
    faces.push([index[i], index[i + 1], index[i + 2]]);
  }

  return new CANNON.ConvexPolyhedron({ vertices: points, faces });
}*/

const createDiceShape = (diceMesh: THREE.Mesh) => {
  const diceShape = cannonU.CreateTriMesh(diceMesh, {
    x: 0.21,
    y: 0.21,
    z: 0.21,
  });

  return diceShape;
};

export const createBody = async (
  diceMesh: THREE.Mesh,
  diceShape: CANNON.Shape
) => {
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
    Math.random() * -12,
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

  diceBody.addEventListener("sleep", () => {
    const euler = new THREE.Euler();
    const rotation = euler.setFromQuaternion(diceMesh.quaternion);
    const radians = rotation.x > 0 ? rotation.x : 2 * Math.PI + rotation.x;
    console.log((radians * 180) / Math.PI);
  });

  return diceBody;
};

export const createDices = async (
  scene: THREE.Scene,
  amount: number,
  world: CANNON.World,
  defaultMaterial: CANNON.Material
) => {
  const typeInput = document.querySelector(
    'input[name="type"]:checked'
  ) as HTMLInputElement;
  const type = typeInput.value;

  const diceInput = document.querySelector(
    'input[name="dice"]:checked'
  ) as HTMLInputElement;
  const dice = diceInput.value;

  let dices: { body: CANNON.Body; mesh: THREE.Mesh }[] = [];

  const diceMesh = dicesAndShapes[type][dice].mesh;
  diceMesh.material.metalness = 0.5;
  diceMesh.scale.setScalar(0.8);

  const diceShape = createDiceShape(diceMesh);
  //const diceShape = getPolyhedronShape(diceMesh);

  for (let i = 0; i < amount; i++) {
    const diceClone = diceMesh.clone();
    diceClone.position.x = (Math.random() - 0.5) * 10;
    diceClone.position.z = (Math.random() - 0.5) * 10;
    diceClone.position.y = 12;

    diceClone.castShadow = true;
    scene.add(diceClone);

    const diceBody = await createBody(
      diceClone as THREE.Mesh,
      diceShape as CANNON.Shape
    );
    diceBody.material = defaultMaterial;

    world.addBody(diceBody);

    dices.push({ body: diceBody, mesh: diceClone as THREE.Mesh });
  }

  return dices;
};
