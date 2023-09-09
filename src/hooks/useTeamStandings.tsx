import { isAxiosError } from 'axios';
import { Game } from 'mlb-api/schedule';
import { Team } from 'mlb-api/teams';
import { Standings } from 'mlb-api/standings';
import { useEffect, useState } from 'react';

import { logError } from '../utils';
import { getStandings } from '../services/mlbApi';

interface useTeamStandingsReturnType {
  standings?: Standings;
  loading: boolean;
  error?: string;
}
export const useTeamStandings = (
  team: Team,
  liveGame?: Game,
): useTeamStandingsReturnType => {
  const [standings, setStandings] = useState<Standings | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const st = await getStandings(team.league.id);
        setStandings(st);
      } catch (err) {
        if (isAxiosError(err) || err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
          logError(err, 'useTeamStandings -> useEffect -> init');
        }
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [liveGame, team.league]);

  return {
    standings,
    loading,
    error,
  };
};
