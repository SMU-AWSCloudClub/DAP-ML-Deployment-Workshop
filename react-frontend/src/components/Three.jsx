import { Canvas } from "@react-three/fiber";
import Box from "./Box";
import Model from "./Model";
import { OrbitControls } from "@react-three/drei";

const Three = () => {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[-2, 5, 2]} intensity={1} />
        <pointLight position={[10, 10, 10]} />
        {/* <Box /> */}
        <Model modelPath={"/apartment.glb"}></Model>
      </Canvas>
    </div>
  );
};

export default Three;
