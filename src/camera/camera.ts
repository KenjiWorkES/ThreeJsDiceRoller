import * as THREE from "three";

export const createMainCamera = (
  sizes: { width: number; height: number },
  position: THREE.Vector3
) => {
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.set(2, 6, 10);
  camera.lookAt(position);
  return camera;
};
