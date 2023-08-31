import { Game, GameDate } from 'mlb-api';

import { MLBTeam } from '../../models';
import { abbreviateTeam } from '../../utils';
import { Scorecard } from '../../components';
import { SeriesPreview } from '../../components/SeriesPreview';
import { useSeriesData } from '../../hooks';

interface CurrentSeriesDataProps {
  schedule: GameDate[];
  selectedTeam: MLBTeam;
  targetGame: Game;
}

const CurrentSeriesData = ({
  schedule,
  selectedTeam,
  targetGame,
}: CurrentSeriesDataProps) => {
  const {
    selectedTeamScore,
    opposingTeamName,
    opposingTeamScore,
    seriesSchedule,
  } = useSeriesData(schedule, selectedTeam, targetGame);

  return (
    <div>
      <p className="text-center text-xl">Current Series</p>
      <Scorecard
        selectedTeamName={abbreviateTeam(selectedTeam.name)}
        opposingTeamName={abbreviateTeam(opposingTeamName)}
        opposingTeamScore={opposingTeamScore}
        selectedTeamScore={selectedTeamScore}
      />
      <SeriesPreview selectedTeam={selectedTeam} series={seriesSchedule} />
    </div>
  );
};

export default CurrentSeriesData;
