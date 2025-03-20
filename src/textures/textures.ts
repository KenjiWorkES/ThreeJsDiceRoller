import * as THREE from "three";

export const textureLoader = new THREE.TextureLoader();

export const floorAlphaTexture = textureLoader.load(
  "/textures/floor/alpha.jpg"
);
