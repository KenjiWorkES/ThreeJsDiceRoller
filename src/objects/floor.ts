import * as THREE from "three";
import * as CANNON from "cannon-es";
import { floorAlphaTexture } from "../textures";

const createFloorBody = () => {
  const floorShape = new CANNON.Plane();
  const floorBody = new CANNON.Body({
    mass: 0,
    shape: floorShape,
  });

  floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0),
    Math.PI * 0.5
  );

  return floorBody;
};

const createFloorMesh = () => {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({
      color: "#B7C0EE",
      transparent: true,
      alphaMap: floorAlphaTexture,
    })
  );

  floor.rotation.x = -Math.PI * 0.5;
  floor.receiveShadow = true;
  return floor;
};

export const createFloor = (): [THREE.Mesh, CANNON.Body] => {
  const floorBody = createFloorBody();
  const floorMesh = createFloorMesh();
  return [floorMesh, floorBody];
};
