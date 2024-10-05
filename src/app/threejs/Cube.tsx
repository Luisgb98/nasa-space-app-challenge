'use client'
import { useRef, useEffect } from "react";
import * as THREE from "three";

interface CubeProps {
  scene: THREE.Scene,
  renderer: THREE.Renderer,
  camera: THREE.Camera
}

const Cube = ({ scene, renderer, camera } : CubeProps) => {
  const cubeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    // Create the cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    renderer.render(scene, camera);

    // Store reference to cube for animation
    cubeRef.current = cube;

  }, [scene]);

  // Rotate the cube in each animation frame
  useEffect(() => {
    const animate = () => {
      if (cubeRef.current) {
        cubeRef.current.rotation.x += 0.01;
        cubeRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      
    };
    animate();
  }, []);

  return null; // Cube is added to the scene, no need to render anything directly
};

export default Cube;