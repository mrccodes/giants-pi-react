import React, { HTMLProps, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

import { CameraOptions, LogoOptions } from '../models';
import { verifyVector3D } from '../utils';
import { useThreeSetup } from '../hooks';

/**
 * Props for the STLComponent.
 */
export interface STLComponentProps extends HTMLProps<HTMLDivElement> {
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


const STLComponent = ({ 
  fileUrl, 
  height = window.innerHeight, 
  width = window.innerWidth,
  lightColor = 0xffffff,
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
  style,
  ...rest
}: STLComponentProps) => {
  const { container, camera, scene, renderer } = useThreeSetup({ height, width, lightColor, fov: cameraFov });
  const animationId = useRef<number | null>(null); 


  React.useEffect(() => {
    const loader = new STLLoader();
    const currentContainer = container.current;
    if (currentContainer) {
      loader.load(fileUrl, (geometry) => {
        const material = new THREE.MeshBasicMaterial({ color: logoColor });
        const mesh = new THREE.Mesh(geometry, material);

        const group = new THREE.Group();
        group.add(mesh);

        const logoScaleVector = verifyVector3D(logoScale);

        group.scale.set(logoScaleVector.x, logoScaleVector.y, logoScaleVector.z);
        group.rotation.x = defaultOrientation;

        const cameraPositionVector = verifyVector3D(cameraPosition);
        camera.position.x = cameraPositionVector.x; 
        camera.position.z = cameraPositionVector.z; 
        camera.position.y = cameraPositionVector.y; 

        scene.add(group);

        const animate = () => {
          animationId.current = requestAnimationFrame(animate);
          mesh.rotation.z -= rotationSpeed;
          renderer.render(scene, camera);
        };
        animate();


        return () => {
          animationId.current && cancelAnimationFrame(animationId.current); 
          scene.remove(group); 
          material.dispose();  
          geometry.dispose();  
        };
      });
    }
  }, [
    logoPath, 
    logoColor, 
    logoScale, 
    defaultOrientation, 
    rotationSpeed, 
    cameraPosition, 
    camera, 
    scene, 
    renderer,
    container,
    fileUrl
  ]); 

  return <div {...rest} style={style} ref={container} />;
};

export default STLComponent;
