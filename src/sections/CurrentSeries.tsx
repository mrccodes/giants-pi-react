import { Game, GameDate } from 'mlb-api/schedule';
import { Team } from 'mlb-api/teams';

import { SeriesData, Widget } from '../components';

interface CurrentSeriesProps {
  team: Team;
  schedule?: GameDate[];
  nextGame?: Game;
  liveGame?: Game;
  loading?: boolean;
}
const CurrentSeries = ({
  schedule,
  team,
  nextGame,
  liveGame,
  loading,
}: CurrentSeriesProps) => {
  const targetGame = liveGame ?? nextGame;

  return schedule && targetGame ? (
    <SeriesData
      loading={loading}
      schedule={schedule}
      selectedTeam={team}
      targetGame={targetGame}
      label="Current Series"
    />
  ) : (
    <Widget loading={loading}>
      <div>
        <p>No Current Series</p>
      </div>
    </Widget>
  );
};

export default CurrentSeries;
