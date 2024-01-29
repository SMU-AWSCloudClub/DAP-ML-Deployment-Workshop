import React from "react";

const Box = () => {

  return (
    <mesh rotation={[90, 0, 20]}>
      <boxGeometry attach="geometry" args={[3, 3, 3]} />
      <meshLambertMaterial attach="material" color="blue" />
    </mesh>
  );
};

export default Box;
