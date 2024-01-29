import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

const Model = ({ modelPath }) => {
  const glb = useLoader(GLTFLoader, modelPath);
  const model = glb.scene;
  model.scale.multiplyScalar(2.7);
  model.rotation.set(Math.PI / 6, Math.PI * 1.2, 0);

  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current){
      modelRef.current.rotation.y += 0.003;
    }
  });

  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  return <primitive object={model} ref={modelRef} />;
};

export default Model;
