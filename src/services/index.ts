import { checkForLiveGame } from './mlbApi/schedule';
import { getSchedule } from './mlbApi/schedule';
import getLiveFeedData from './mlbApi/liveFeedData';
import { getTeams } from './mlbApi/teams';
import getStandings from './mlbApi/standings';
import getSplashHits from './splashHits';

export {
  getSchedule,
  checkForLiveGame,
  getLiveFeedData,
  getTeams,
  getSplashHits,
  getStandings,
};
export const MLB_API_BASE_URL = 'https://statsapi.mlb.com/api';
