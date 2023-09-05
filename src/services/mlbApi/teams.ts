import axios from 'axios';
import { Team } from 'mlb-api/teams';

import { MLB_API_BASE_URL } from '.';

export const getTeams = async (): Promise<Team[]> => {
  const url = `${MLB_API_BASE_URL}/v1/teams?sportId=1`;
  return (await axios.get(url)).data.teams as Team[];
};
