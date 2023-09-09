import { Game, GameDate } from 'mlb-api/schedule';
import { Team } from 'mlb-api/teams';

import { ErrorMessage, SeriesData, Widget } from '../components';

interface CurrentSeriesProps {
  team: Team;
  schedule?: GameDate[];
  nextGame?: Game;
  liveGame?: Game;
  error?: string;
  loading?: boolean;
}
const CurrentSeries = ({
  schedule,
  team,
  nextGame,
  liveGame,
  error,
  loading,
}: CurrentSeriesProps) => {
  const targetGame = liveGame ?? nextGame;

  if (error)
    return (
      <Widget>
        <ErrorMessage message={error} />
      </Widget>
    );

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
