import GUI from "lil-gui";
import * as THREE from "three";

export const createMainCamera = (
  sizes: { width: number; height: number },
  gui: GUI
) => {
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.set(0, 13, 10.6);

  const folder = gui.addFolder("Camera");
  folder.add(camera.position, "x").min(-30).max(30).step(0.1);
  folder.add(camera.position, "y").min(0).max(30).step(0.1);
  folder.add(camera.position, "z").min(-30).max(30).step(0.1);

  return camera;
};
