import React, { useEffect, useState } from 'react';
import { Team } from 'mlb-api/teams';
import { Record, RecordData } from 'mlb-api/standings';
import { isAxiosError } from 'axios';

import { getStandings } from '../services/mlbApi';
import { ErrorMessage, Widget } from '../components';
import { logError } from '../utils';

interface TeamStatsProps {
  team: Team;
}
const TeamStats = ({ team }: TeamStatsProps) => {
  const [teamStats, setTeamStats] = useState<undefined | RecordData>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const init = async () => {
      try {
        const standings = await getStandings(team.league.id);
        const teamDivision = standings.records.find(
          (rec: Record) => rec.division.id === team.division.id,
        );
        const record = teamDivision?.teamRecords.find(
          (rec: RecordData) => rec.team.id === team.id,
        );
        record && setTeamStats(record);
      } catch (err) {
        if (isAxiosError(err) || err instanceof Error) {
          setError(err.message);
        } else {
          logError(err, 'TeamStats -> init');
        }
      }
    };
    init();
  }, [team.league.id, team.division.id, team.id]);

  if (!teamStats) return <Widget loading={true}>{null}</Widget>;

  return (
    <Widget loading={!teamStats}>
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <table className="table-fixed border-collapse w-full">
          <tbody>
            <tr className="border-b border-slate-600">
              <th className="text-left text-xs">Wins</th>
              <th className="text-lg text-right">{teamStats.wins}</th>
            </tr>
            <tr className="border-b border-slate-600">
              <th className="text-left text-xs">Losses</th>
              <th className="text-lg text-right">{teamStats.losses}</th>
            </tr>
            <tr className="border-b border-slate-600">
              <th className="text-left text-xs">Win Percent</th>
              <th className="text-lg text-right">
                {teamStats.winningPercentage}
              </th>
            </tr>
            <tr className="border-b border-slate-600">
              <th className="text-left text-xs">Games Back</th>
              <th className="text-lg text-right">{teamStats.gamesBack}</th>
            </tr>
            <tr className="border-b border-slate-600">
              <th className="text-left text-xs">Run Diff</th>
              <th className="text-lg text-right">
                {teamStats.runDifferential}
              </th>
            </tr>
            <tr>
              <th className="text-left text-xs">League Rank</th>
              <th className="text-lg text-right">{teamStats.leagueRank}</th>
            </tr>
          </tbody>
        </table>
      )}
    </Widget>
  );
};

export default TeamStats;
