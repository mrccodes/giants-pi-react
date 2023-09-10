import moment from 'moment';
import axios from 'axios';
import { Standings } from 'mlb-api/standings';

import { MLB_API_BASE_URL } from '..';

const getStandings = async (
  leagueId?: number | string,
  year?: string | number,
): Promise<Standings> => {
  if (!year) {
    // defualt to current year
    year = moment().year();
  }

  if (!leagueId) {
    // default to both AL and NL
    leagueId = `103,104`;
  }

  const url = `${MLB_API_BASE_URL}/v1/standings?leagueId=${leagueId}&season=${year}`;
  return (await axios.get(url)).data;
};

export default getStandings;
