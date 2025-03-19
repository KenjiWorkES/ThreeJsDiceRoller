import * as CANNON from "cannon-es";

export const createDefaultContactMaterial = (): [
  CANNON.Material,
  CANNON.ContactMaterial
] => {
  const defaultMaterial = new CANNON.Material("default");

  const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
      friction: 0.5,
      restitution: 0.2,
    }
  );

  return [defaultMaterial, defaultContactMaterial];
};
