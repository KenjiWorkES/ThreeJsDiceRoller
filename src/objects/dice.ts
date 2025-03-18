import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

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

export const createD20 = (
  scene: THREE.Scene,
  amountDiceButton: HTMLElement | null
) => {
  const amount = Number(amountDiceButton?.innerHTML) || 1;
  for (let i = 0; i < amount; i++) {
    gtlfLoader.load("/d20_black/scene.gltf", (gtlf) => {
      const dice =
        gtlf.scene.children[0].children[0].children[0].children[0].children[0];
      console.log(dice);
      dice.position.x = (Math.random() - 0.5) * 4;
      dice.position.z = (Math.random() - 0.4) * 4;
      dice.position.y = 4;
      dice.castShadow = true;
      dice.receiveShadow = true;
      scene.add(dice);
    });
  }
};
