import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const gtlfLoader = new GLTFLoader();

export const createD20 = (scene: THREE.Scene, amount: number) => {
  for (let i = 0; i < amount; i++) {
    gtlfLoader.load("/d20_black/scene.gltf", (dice) => {
      console.log(dice);
      dice.scene.scale.setScalar(0.005);
      dice.scene.position.x = (Math.random() - 0.5) * 4;
      dice.scene.position.z = (Math.random() - 0.4) * 4;
      scene.add(dice.scene);
    });
  }
};
