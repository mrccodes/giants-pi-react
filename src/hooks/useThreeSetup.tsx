import { useEffect, useMemo, useRef } from 'react';
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

const useThreeSetup = ({ width, height, lightColor, fov }: UseThreeSetupProps): UseThreeSetupReturnType => {
  const container = useRef<HTMLDivElement>(null);
  const scene = useMemo(() => new THREE.Scene(), []);
  const camera = useMemo(() => new THREE.PerspectiveCamera(fov, width / height, 0.1, 500), [fov, width, height]);
  const renderer = useMemo(() => new THREE.WebGLRenderer(), []);


  useEffect(() => {
    const currentContainer = container.current;
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(lightColor, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(lightColor, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    renderer.setClearColor(0x060c1d, 1);
    renderer.setSize(width, height);

    if (currentContainer) {
      currentContainer.appendChild(renderer.domElement);
    }

    return () => {
      if (currentContainer) {
        while (currentContainer.firstChild) {
          currentContainer.removeChild(currentContainer.firstChild);
        }

        renderer.dispose();
      }
    };
  }, [width, height, lightColor, camera, renderer, scene]);

  return { container, camera, scene, renderer };
};


export default useThreeSetup;