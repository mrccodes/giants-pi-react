import { useEffect, useState } from 'react';
import { Team } from 'mlb-api/teams';
import { Record, RecordData, Standings } from 'mlb-api/standings';

import { ErrorMessage, Widget } from '../components';

interface TeamStatsProps {
  team: Team;
  loading: boolean;
  standings?: Standings;
  error?: string;
}
const TeamStats = ({ team, standings, error, loading }: TeamStatsProps) => {
  const [teamStats, setTeamStats] = useState<undefined | RecordData>(undefined);

  useEffect(() => {
    if (!standings || loading) return;
    const teamDivision = standings.records.find(
      (rec: Record) => rec.division.id === team.division.id,
    );
    const record = teamDivision?.teamRecords.find(
      (rec: RecordData) => rec.team.id === team.id,
    );
    record && setTeamStats(record);
  }, [team.league.id, team.division.id, team.id, standings, loading]);

  if (!teamStats || loading) return <Widget loading={true}>{null}</Widget>;

  return (
    <Widget>
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <p className="text-center text-2xl font-bold">Team Base Stats</p>
          <table className="table-fixed border-collapse w-full">
            <tbody>
              <tr className="border-b border-slate-600">
                <th className="text-left text-lg">Wins</th>
                <th className="text-xl text-right">{teamStats.wins}</th>
              </tr>
              <tr className="border-b border-slate-600">
                <th className="text-left text-lg">Losses</th>
                <th className="text-xl text-right">{teamStats.losses}</th>
              </tr>
              <tr className="border-b border-slate-600">
                <th className="text-left text-lg">Win Percent</th>
                <th className="text-xl text-right">
                  {teamStats.winningPercentage}
                </th>
              </tr>
              <tr className="border-b border-slate-600">
                <th className="text-left text-lg">Games Back</th>
                <th className="text-xl text-right">{teamStats.gamesBack}</th>
              </tr>
              <tr className="border-b border-slate-600">
                <th className="text-left text-lg">Run Diff</th>
                <th className="text-xl text-right">
                  {teamStats.runDifferential}
                </th>
              </tr>
              <tr>
                <th className="text-left text-lg">League Rank</th>
                <th className="text-xl text-right">{teamStats.leagueRank}</th>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </Widget>
  );
};

export default TeamStats;
