import { CameraOptions, LogoOptions } from './index';

/**
 * Interface TeamLogoData
 *
 * @interface
 */
export default interface TeamLogoData {
  camera: CameraOptions;
  logo: LogoOptions;
  /**
   * The unique identifier for a baseball team, corresponding to the team IDs used in the MLB Stats API.
   */
  id: number;
}
