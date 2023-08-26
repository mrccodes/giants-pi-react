import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

import { CameraOptions, LogoOptions } from '../models';
import { verifyVector3D } from '../utils';

/**
 * Props for the STLComponent.
 */
interface STLComponentProps {
  /** The URL of the STL file to be rendered. */
  fileUrl: string;

  /** Options related to the camera's behavior and position. */
  cameraOptions: CameraOptions;

  /** Options for customizing the logo's appearance and behavior. */
  logoOptions: LogoOptions;

  /** The height of the component. */
  height?: number;

  /** The width of the component. */
  width?: number;

  /** The light color for the scene. */
  lightColor?: THREE.ColorRepresentation;

  /** Custom styles for the component's container. */
  style?: React.CSSProperties;
}

/**
 * A component to render an STL file using Three.js.
 */
const STLComponent: React.FC<STLComponentProps> = ({ 
  fileUrl, 
  height = window.innerHeight, 
  width = window.innerWidth,
  lightColor,
  cameraOptions: {
    cameraFov = 40,
    cameraPosition
  },  
  logoOptions: {
    defaultOrientation = -Math.PI/2,
    rotationSpeed = 0.025,
    logoPath,
    logoColor,
    logoScale
  },
  style
}) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const currentContainer = container.current;

    const loader = new STLLoader();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      cameraFov ?? 40, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      500
    );

    // look at the center of the scene
    camera.lookAt(0, 0, 0)

    // Adding an ambient light
    const ambientLight = new THREE.AmbientLight(lightColor, 0.5); 
    scene.add(ambientLight);

    // Adding a directional light
    const directionalLight = new THREE.DirectionalLight(lightColor, 0.5); 
    directionalLight.position.set(0, 1, 1); 
    scene.add(directionalLight);

    const renderer = new THREE.WebGLRenderer();

    // Set scene background color
    renderer.setClearColor( 0x060c1d, 1 )

    renderer.setSize(
      width ?? window.innerWidth, 
      height ?? window.innerHeight
    );

    if (currentContainer) {
      currentContainer.appendChild(renderer.domElement);

      loader.load(logoPath, (geometry) => {
        const material = new THREE.MeshBasicMaterial({ color: logoColor });
        const mesh = new THREE.Mesh(geometry, material);

        const group = new THREE.Group();
        group.add(mesh);

        typeof logoScale === 'number' ? 
          group.scale.set(logoScale, logoScale, logoScale) : 
          group.scale.set(logoScale.x, logoScale.y, logoScale.z);

        group.rotation.x = defaultOrientation ;
        scene.add(group);
        

        const cameraPositionVector = verifyVector3D(cameraPosition);
        
        camera.position.x =  cameraPositionVector.x;
        camera.position.z = cameraPositionVector.y;
        camera.position.y = cameraPositionVector.z;

        const animate = () => {
          requestAnimationFrame(animate);
          mesh.rotation.z -= rotationSpeed;
          renderer.render(scene, camera);
        };
        animate();
      });
    }

    return () => { // Cleanup on unmount
      if (currentContainer) {
        while (currentContainer.firstChild) {
          currentContainer.removeChild(currentContainer.firstChild);
        }
      }
    };
  }, [
        fileUrl, 
        cameraFov, 
        cameraPosition, 
        defaultOrientation, 
        height, 
        width, 
        lightColor, 
        logoColor, 
        logoPath, 
        logoScale, 
        rotationSpeed
      ]);

  return <div style={style} ref={container} />;
};

export default STLComponent;
