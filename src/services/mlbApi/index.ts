import { checkForLiveGame } from './schedule';
import { getSchedule } from './schedule';
import getLiveFeedData from './liveFeedData';
import { getTeams } from './teams';

export { getSchedule, checkForLiveGame, getLiveFeedData, getTeams };
export const MLB_API_BASE_URL = 'https://statsapi.mlb.com/api';
