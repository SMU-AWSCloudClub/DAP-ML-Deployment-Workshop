import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

const Model = ({ modelPath }) => {
  const glb = useLoader(GLTFLoader, modelPath);
  const model = glb.scene;

  // Check if the model has been scaled already
  if (!model.userData.scaled) {
    model.scale.multiplyScalar(2.7);
    model.rotation.set(Math.PI / 6, Math.PI * 1.2, 0);
    // Mark the model as scaled
    model.userData.scaled = true;
  }

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
