import { Game, GameDate } from 'mlb-api';

import { SeriesData, Widget } from '../components';
import { MLBTeam } from '../models';
import { findEndOfPreviousSeriesGame, reduceScheduleToGames } from '../utils';

interface PreviousSeriesProps {
  team: MLBTeam;
  schedule?: GameDate[];
  nextGame?: Game;
  liveGame?: Game;
}
const PreviousSeries = ({
  schedule,
  team,
  nextGame,
  liveGame,
}: PreviousSeriesProps) => {
  const allGames = reduceScheduleToGames(schedule ?? []);
  const currentGame = liveGame ?? nextGame;

  if (!currentGame || !schedule) {
    return (
      <Widget>
        <p>No Recent Series</p>
      </Widget>
    );
  }

  const targetGame = findEndOfPreviousSeriesGame(team, currentGame, allGames);

  return (
    <SeriesData
      schedule={schedule}
      selectedTeam={team}
      targetGame={targetGame}
      label="Most Recent Series"
    />
  );
};

export default PreviousSeries;
