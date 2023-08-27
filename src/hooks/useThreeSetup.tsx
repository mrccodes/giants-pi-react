import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface UseThreeSetupProps {
  width: number;
  height: number;
  lightColor: THREE.ColorRepresentation;
  fov: number;
}

interface UseThreeSetupReturnType {
    container: React.RefObject<HTMLDivElement>;
    camera: THREE.Camera,
    scene: THREE.Scene;
    renderer: THREE.Renderer
}

export const useThreeSetup = ({ width, height, lightColor, fov }: UseThreeSetupProps): UseThreeSetupReturnType => {
  const container = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 500);
  const renderer = new THREE.WebGLRenderer();

  useEffect(() => {
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(lightColor, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(lightColor, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    renderer.setClearColor(0x060c1d, 1);
    renderer.setSize(width, height);

    if (container.current) {
      container.current.appendChild(renderer.domElement);
    }

    return () => {
      if (container.current) {
        while (container.current.firstChild) {
          container.current.removeChild(container.current.firstChild);
        }
      }
    };
  }, [width, height, lightColor]);

  return { container, camera, scene, renderer };
};
