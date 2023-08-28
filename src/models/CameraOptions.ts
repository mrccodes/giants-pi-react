import { Vector3DOrScalar } from './index';

/**
 * Interface CameraOptions
 *
 * @interface
 */
export default interface CameraOptions {
  /**
   * The cameras location vector
   */
  cameraPosition: Vector3DOrScalar;
  /**
   * The camers FOV
   *
   * @default 40
   */
  cameraFov?: number;
}
