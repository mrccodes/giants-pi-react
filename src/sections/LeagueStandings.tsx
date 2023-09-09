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

  console.log({ standings });

  return (
    <>
      {standings.records
        .sort((a, b) =>
          a.division.id === team.division.id
            ? -1
            : b.division.id === team.division.id
            ? 1
            : 0,
        )
        .map((r) => (
          <Widget key={r.league.id} {...rest}>
            <>
              <p className="font-bold pb-2 text-center">
                {getDivisionName(r.division.id)}
              </p>
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-xs">Rank</th>
                    <th className="text-xs">Name</th>
                    <th className="text-xs">W-L</th>
                    <th className="text-xs">GB</th>
                    <th className="text-xs">League Rank</th>
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
      className={`text-xs  ${
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
