import { Game, GameDate } from 'mlb-api/schedule';
import { Team } from 'mlb-api/teams';

import { SeriesData, Widget } from '../components';
import { findEndOfPreviousSeriesGame, reduceScheduleToGames } from '../utils';

interface PreviousSeriesProps {
  team: Team;
  schedule?: GameDate[];
  nextGame?: Game;
  liveGame?: Game;
  loading?: boolean;
}
const PreviousSeries = ({
  schedule,
  team,
  nextGame,
  liveGame,
  loading,
}: PreviousSeriesProps) => {
  const allGames = reduceScheduleToGames(schedule ?? []);
  const currentGame = liveGame ?? nextGame;

  if (!currentGame || !schedule) {
    return (
      <Widget loading={loading}>
        <p>No Recent Series</p>
      </Widget>
    );
  }

  const targetGame = findEndOfPreviousSeriesGame(team, currentGame, allGames);

  return (
    <SeriesData
      loading={loading}
      schedule={schedule}
      selectedTeam={team}
      targetGame={targetGame}
      label="Most Recent Series"
    />
  );
};

export default PreviousSeries;
