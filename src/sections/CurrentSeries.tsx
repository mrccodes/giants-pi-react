import { Game, GameDate } from 'mlb-api';

import { SeriesData, Widget } from '../components';
import { MLBTeam } from '../models';

interface CurrentSeriesProps {
  team: MLBTeam;
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
