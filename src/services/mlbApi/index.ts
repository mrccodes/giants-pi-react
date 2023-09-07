import { checkForLiveGame } from './schedule';
import { getSchedule } from './schedule';
import getLiveFeedData from './liveFeedData';
import { getTeams } from './teams';
import getStandings from './standings';

export {
  getSchedule,
  checkForLiveGame,
  getLiveFeedData,
  getTeams,
  getStandings,
};
export const MLB_API_BASE_URL = 'https://statsapi.mlb.com/api';
