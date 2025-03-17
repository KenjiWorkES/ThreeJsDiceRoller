import * as THREE from "three";
import GUI from "lil-gui";

const sizes = {
  height: window.innerHeight,
  width: window.innerWidth,
};

const gui = new GUI();
const canvas = document.getElementById("webgl-canva");
const scene = new THREE.Scene();

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: "#B7C0EE" })
);

floor.rotation.x = -Math.PI * 0.5;

scene.add(floor);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
camera.position.set(1, 2, 2);
camera.lookAt(floor.position);

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const renderer = new THREE.WebGLRenderer({
  canvas: canvas as HTMLCanvasElement,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.render(scene, camera);
