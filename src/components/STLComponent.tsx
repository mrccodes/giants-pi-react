import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'

interface STLComponentProps {
  fileUrl: string;
  height?: number;
  width?: number;
}

const STLComponent: React.FC<STLComponentProps> = ({ fileUrl, height, width }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new STLLoader();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.lookAt(0, 0, 0)

    // Adding an ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
    scene.add(ambientLight);

    // Adding a directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // white, half intensity
    directionalLight.position.set(0, 1, 1); // positioning the light
    scene.add(directionalLight);

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0x060c1d, 1 )
    renderer.setSize(width ?? window.innerWidth, height ?? window.innerHeight);

    if (container.current) {
      container.current.appendChild(renderer.domElement);

      loader.load(fileUrl, (geometry) => {
        const material = new THREE.MeshBasicMaterial({color: 0xfd5a1e});
        const mesh = new THREE.Mesh(geometry, material);

        const group = new THREE.Group();
        group.add(mesh);


        group.scale.set(0.05, 0.05, 0.05);
        group.rotation.x =  - Math.PI / 2;
        scene.add(group);
        camera.position.z = 10;
        camera.position.y = 2;

        const animate = () => {
          requestAnimationFrame(animate);
          mesh.rotation.z -= 0.025;
          renderer.render(scene, camera);
        };
        animate();
      });
    }

    return () => { // Cleanup on unmount
      if (container.current) {
        while (container.current.firstChild) {
          container.current.removeChild(container.current.firstChild);
        }
      }
    };
  }, [fileUrl]);

  return <div style={{position: 'absolute'}} ref={container} />;
};

export default STLComponent;
