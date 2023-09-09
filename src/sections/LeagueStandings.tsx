import { Record, Standings } from 'mlb-api/standings';
import React from 'react';
import { Team } from 'mlb-api/teams';

import { ErrorMessage, Widget } from '../components';
import getDivisionName from '../utils/getDivision';
import { abbreviateTeam } from '../utils';

interface LeagueStandingsProps extends React.HTMLProps<HTMLDivElement> {
  standings?: Standings;
  loading: boolean;
  team: Team;
  error?: string;
}
const LeagueStandings = ({
  standings,
  team,
  loading,
  error,
  ...rest
}: LeagueStandingsProps) => {
  if (loading || !standings)
    return (
      <Widget {...rest} loading={true}>
        {null}
      </Widget>
    );

  if (error)
    return (
      <Widget {...rest}>
        <ErrorMessage message={error} />
      </Widget>
    );

  return (
    <>
      {standings.records
        .filter((d) => d.division.id === team.division.id)
        .map((r) => (
          <Widget key={r.league.id} {...rest}>
            <>
              <p className="font-bold text-2xl pb-1 text-center">
                {getDivisionName(r.division.id)} Standings
              </p>
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-lg">Rank</th>
                    <th className="text-lg">Name</th>
                    <th className="text-lg">W-L</th>
                    <th className="text-lg">GB</th>
                    <th className="text-lg">L. Rank</th>
                  </tr>
                </thead>
                <tbody>
                  <TeamRecords records={r.teamRecords} />
                </tbody>
              </table>
            </>
          </Widget>
        ))}
    </>
  );
};

interface TeamRecordsProps {
  records: Record['teamRecords'];
}
const TeamRecords = ({ records }: TeamRecordsProps) => {
  const sorted = records.sort((a, b) =>
    a.divisionRank < b.divisionRank ? -1 : 1,
  );

  return sorted.map((r, idx) => (
    <tr
      key={r.team.id}
      className={`text-lg  ${
        idx === sorted.length - 1 ? '' : 'border-b border-slate-700'
      }`}
    >
      <th>{r.divisionRank}</th>
      <th>{abbreviateTeam(r.team.name)}</th>
      <th>
        {r.wins}-{r.losses}
      </th>
      <th>{r.divisionGamesBack}</th>
      <th>{r.leagueRank}</th>
    </tr>
  ));
};

export default LeagueStandings;
