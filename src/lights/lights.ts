import * as THREE from "three";

export const createAmbientLight = () => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  return ambientLight;
};

export const createDirectionalLight = () => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
  directionalLight.castShadow = true;
  directionalLight.position.set(3, 2, -8);

  directionalLight.shadow.mapSize.width = 256;
  directionalLight.shadow.mapSize.height = 256;

  directionalLight.shadow.camera.top = 8;
  directionalLight.shadow.camera.right = 8;
  directionalLight.shadow.camera.bottom = -8;
  directionalLight.shadow.camera.left = -8;

  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 20;

  return directionalLight;
};

export const createSceneLights = () => {
  const directionlLight = createDirectionalLight();
  const ambientLight = createAmbientLight();

  return [ambientLight, directionlLight];
};
