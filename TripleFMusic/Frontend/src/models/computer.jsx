import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Loader from "../pages/MainArea/Loader";
import "./Computer.css";

const Computer = () => {
  const { scene } = useGLTF("./computer3/scene.gltf");
  const computerScene = useMemo(() => {
    if (scene) {
      scene.position.set(0, -1, 0); // Adjust position as needed
      scene.scale.set(5, 5, 5);
      return scene;
    }
  }, [scene]);

  if (!computerScene) return null; // Render nothing if the scene is not yet loaded
  scene.rotation.set(0, Math.PI / 6, 0);
  return <primitive object={computerScene} />;
};

const ComputerCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [0, 0, -10], fov: 50 }}
      gl={{ preserveDrawingBuffer: true }}
      style={{ width: "100%", height: "80vh" }}
      className="canvas"
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls
          enableZoom={false}
          enableRotate={true}
          minAzimuthAngle={-Math.PI / 6}
          maxAzimuthAngle={Math.PI / 3}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI - Math.PI / 2}
        />
        <hemisphereLight intensity={1} position={[0, 10, 0]} />
        <spotLight intensity={100} position={[0, 10, 0]} angle={0.3} />
        <ambientLight intensity={0.5} />
        <Computer />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputerCanvas;
