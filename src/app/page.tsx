"use client";

import * as THREE from "three";
import { useEffect, useRef, } from "react";
import Planet from "./threejs/Planet";
import Cube from "./threejs/Cube";

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const rendererRef = useRef<THREE.Renderer | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {

      // Set up the scene, camera, and renderer
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRef.current = camera;
      const renderer = new THREE.WebGLRenderer();
      rendererRef.current = renderer;
      renderer.setSize(window.innerWidth, window.innerHeight);

      mountRef.current?.appendChild(renderer.domElement);

      // Position the camera
      camera.position.z = 5;
/* 
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      renderer.render(scene, camera); */
    }
  }, []);

  return (
    <div ref={mountRef}>
      {sceneRef.current && cameraRef.current && rendererRef.current && (
        <Cube scene={sceneRef.current} renderer={rendererRef.current} camera={cameraRef.current} />
      )}
    </div>
  );
};

export default ThreeScene;