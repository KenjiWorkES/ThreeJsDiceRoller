import { Sky } from "three/examples/jsm/Addons.js";

export const createSky = () => {
  const sky = new Sky();
  sky.scale.setScalar(100);

  sky.material.uniforms["turbidity"].value = 10;
  sky.material.uniforms["rayleigh"].value = 0.5;
  sky.material.uniforms["mieCoefficient"].value = 0.1;
  sky.material.uniforms["mieDirectionalG"].value = 0.95;
  sky.material.uniforms["sunPosition"].value.set(0, 1, -0.95);

  return sky;
};
