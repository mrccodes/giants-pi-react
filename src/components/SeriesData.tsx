import { Game, GameDate } from 'mlb-api';

import { MLBTeam } from '../models';
import { abbreviateTeam } from '../utils';
import { Scorecard } from '.';
import { SeriesPreview } from './SeriesPreview';
import { useSeriesData } from '../hooks';

interface SeriesDataProps {
  schedule: GameDate[];
  selectedTeam: MLBTeam;
  targetGame: Game;
  label: string;
}

const SeriesData = ({
  schedule,
  selectedTeam,
  targetGame,
  label,
}: SeriesDataProps) => {
  const {
    selectedTeamScore,
    opposingTeamName,
    opposingTeamScore,
    seriesSchedule,
  } = useSeriesData(schedule, selectedTeam, targetGame);

  return (
    <div>
      <p className="text-center text-xl">{label}</p>
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

export default SeriesData;
