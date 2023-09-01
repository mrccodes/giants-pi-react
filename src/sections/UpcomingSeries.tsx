import { Game, GameDate } from 'mlb-api';

import { SeriesData } from '../components';
import { MLBTeam } from '../models';

interface UpcomingSeriesProps {
  schedule: GameDate[];
  targetGame: Game;
  team: MLBTeam;
}
const UpcomingSeries = ({
  schedule,
  team,
  targetGame,
}: UpcomingSeriesProps) => {
  return schedule && targetGame ? (
    <SeriesData
      schedule={schedule}
      selectedTeam={team}
      targetGame={targetGame}
      label="Upcoming Series"
    />
  ) : (
    <div>
      <p>No Current Series</p>
    </div>
  );
};

export default UpcomingSeries;
