import { checkForLiveGame } from './schedule';
import { getSchedule } from './schedule';
import getBoxscore from './boxscore';

export { getSchedule, checkForLiveGame, getBoxscore };
export const MLB_API_BASE_URL = 'https://statsapi.mlb.com/api';
