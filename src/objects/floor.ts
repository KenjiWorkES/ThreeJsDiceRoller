import * as THREE from "three";
import * as CANNON from "cannon-es";
import { floorAlphaTexture } from "../textures";
import GUI from "lil-gui";

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
      color: "#424874",
      transparent: true,
      alphaMap: floorAlphaTexture,
    })
  );

  floor.rotation.x = -Math.PI * 0.5;
  floor.receiveShadow = true;
  return floor;
};

export const createFloor = (gui: GUI): [THREE.Mesh, CANNON.Body] => {
  const floorBody = createFloorBody();
  const floorMesh = createFloorMesh();

  const folder = gui.addFolder("Floor");
  folder.addColor(floorMesh.material, "color");
  return [floorMesh, floorBody];
};
