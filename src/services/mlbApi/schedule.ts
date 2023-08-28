import moment from 'moment';
import axios from 'axios';
import { Game, GameDate } from 'mlb-api';

import { MLBTeam } from '../../models';

const apiDateFormat = 'YYYY-MM-DD';

/**
 * Returns 2 weeks of teams schedule starting from 1 week ago, to 1 week away by default
 */
export const getSchedule = async (
  team: MLBTeam,
  startDate: moment.Moment = moment().subtract(1, 'week'),
  endDate: moment.Moment = moment().add(1, 'week'),
) => {
  const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=${
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

export const checkForLiveGame = async (
  team: MLBTeam,
  schedule?: GameDate[],
): Promise<Game | undefined> => {
  schedule =
    schedule ??
    ((await getSchedule(team, moment(), moment())).dates as GameDate[]);
  const day = schedule[0] as GameDate;
  return day?.games.find((game) => game.status.abstractGameState === 'Live');
};
