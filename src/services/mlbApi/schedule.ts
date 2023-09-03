import moment from 'moment';
import axios from 'axios';
import { Game, GameDate } from 'mlb-api';

import { MLB_API_BASE_URL } from '.';
import { MLBTeam } from '../../models';

const apiDateFormat = 'YYYY-MM-DD';

interface getScheduleReturnType {
  copyright: string;
  dates: GameDate[];
  totalEvents: number;
  totalGames: number;
  totalGamesInProgress: number;
  totalItems: number;
}

/**
 * Returns 2 weeks of teams schedule starting from 1 week ago, to 1 week away by default
 */
export const getSchedule = async (
  team: MLBTeam,
  startDate: moment.Moment = moment().subtract(1, 'week'),
  endDate: moment.Moment = moment().add(1, 'week'),
): Promise<getScheduleReturnType> => {
  const url = `${MLB_API_BASE_URL}/v1/schedule?sportId=1&teamId=${
    team.id
  }&startDate=${startDate.format(apiDateFormat)}&endDate=${endDate.format(
    apiDateFormat,
  )}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching team schedule:', error);
    throw error;
  }
};

/**
 * MLB api stat wrapper function to fetch a teams current schedule and return the currently live game, if any
 */
export const checkForLiveGame = async (
  /**
   * The team to fetch the schedule for
   */
  team: MLBTeam,
  /**
   * Optionally use a prefetched schedule
   */
  schedule?: GameDate[],
  /**
   * Optionall pass an update schedule function to update state when the request is made for the schedule
   */
  updateSchedule?: (s: GameDate[]) => void,
): Promise<Game | undefined> => {
  schedule = schedule ?? ((await getSchedule(team)).dates as GameDate[]);
  updateSchedule && updateSchedule(schedule);
  const day = schedule.find((day) => moment(day.date).isSame(moment(), 'd'));
  return day?.games.find((game) => game.status.abstractGameState === 'Live');
};
