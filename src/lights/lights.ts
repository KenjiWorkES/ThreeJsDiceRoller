import GUI from "lil-gui";
import * as THREE from "three";

export const createAmbientLight = () => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 5);
  return ambientLight;
};

export const createDirectionalLight = (gui: GUI) => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 15);
  directionalLight.castShadow = true;
  directionalLight.position.set(-4.9, 13.9, -10.7);

  directionalLight.shadow.mapSize.width = 1200;
  directionalLight.shadow.mapSize.height = 1200;

  directionalLight.shadow.camera.top = 24;
  directionalLight.shadow.camera.right = 24;
  directionalLight.shadow.camera.bottom = -24;
  directionalLight.shadow.camera.left = -24;

  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 100;

  const folder = gui.addFolder("Directional Light");
  folder.add(directionalLight.position, "x").min(-30).max(30).step(0.1);
  folder.add(directionalLight.position, "y").min(-30).max(30).step(0.1);
  folder.add(directionalLight.position, "z").min(-30).max(30).step(0.1);

  const shadowFolder = folder.addFolder("Light Shadow");
  shadowFolder.add(directionalLight.shadow.mapSize, "width");
  shadowFolder.add(directionalLight.shadow.mapSize, "height");

  return directionalLight;
};

export const createSceneLights = (gui: GUI) => {
  const directionlLight = createDirectionalLight(gui);
  const ambientLight = createAmbientLight();

  return [ambientLight, directionlLight];
};
