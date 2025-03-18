import * as THREE from "three";

export const createFloor = () => {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshStandardMaterial({ color: "#B7C0EE" })
  );

  floor.rotation.x = -Math.PI * 0.5;
  floor.receiveShadow = true;
  return floor;
};
