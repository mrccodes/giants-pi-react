import { CameraOptions, LogoOptions } from './index';

/**
 * Interface MLBTeam
 *
 * @interface
 */
export default interface MLBTeam {
  camera: CameraOptions;
  logo: LogoOptions;
  /**
   * The unique identifier for a baseball team, corresponding to the team IDs used in the MLB Stats API.
   */
  id: string;
  /**
   * The name of the team to render on the frontend
   */
  name: string;
}
