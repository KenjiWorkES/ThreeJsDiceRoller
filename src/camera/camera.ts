import * as THREE from "three";

export const createMainCamera = (sizes: { width: number; height: number }) => {
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.set(1, 2, 2);
  return camera;
};
