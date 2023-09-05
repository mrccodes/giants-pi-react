import { teamLogoData } from '../data';
import { TeamLogoData } from '../models';

const getTeamLogo = (teamId: number): TeamLogoData | undefined => {
  return teamLogoData.find((ld) => ld.id === teamId);
};

export default getTeamLogo;
