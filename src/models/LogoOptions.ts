import { Vector3DOrScalar } from "./index";

export default interface LogoOptions {
    /**
     * The local stl file path to the .stl file to logo for the team
     * should begin with `/src/assets/teamLogos/`
     */
    logoPath: string;
    /**
     * The color to render the logo
     * 
     * @type (THREE.ColorRepresnetation)
     */
    logoColor: THREE.ColorRepresentation;
    /**
     * Scale of the object
     */
    logoScale: Vector3DOrScalar;
    /**
     * The angle of rotation to render the STL
     * 
     * @default -Math.PI/2 (which is equivalent to -1.5708)
     */
    defaultOrientation?: number;
    /**
     * Controls the speed of rotation, higher value rotates faster
     * 
     * @default 0.025
     */
    rotationSpeed?: number;
  }
