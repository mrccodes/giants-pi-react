import { Game, GameDate } from 'mlb-api';

import { MLBTeam } from '../models';
import { abbreviateTeam } from '../utils';
import { Scorecard, Widget } from '.';
import { SeriesPreview } from './SeriesPreview';
import { useSeriesData } from '../hooks';

interface SeriesDataProps extends React.HTMLProps<HTMLDivElement> {
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
  ...rest
}: SeriesDataProps) => {
  const {
    selectedTeamScore,
    opposingTeamName,
    opposingTeamScore,
    seriesSchedule,
  } = useSeriesData(schedule, selectedTeam, targetGame);

  const borderColor =
    selectedTeamScore > opposingTeamScore
      ? 'border-green-600'
      : selectedTeamScore > opposingTeamScore
      ? 'border-red-600'
      : undefined;

  return (
    <Widget {...rest} borderColor={borderColor}>
      <p className="text-center text-xl">{label}</p>
      <Scorecard
        className="py-1"
        selectedTeamName={abbreviateTeam(selectedTeam.name)}
        opposingTeamName={abbreviateTeam(opposingTeamName)}
        opposingTeamScore={opposingTeamScore}
        selectedTeamScore={selectedTeamScore}
      />
      {selectedTeamScore === 0 && opposingTeamScore === 0 ? (
        <div className="py-3">
          <p className="text-center">No games completed yet!</p>
        </div>
      ) : (
        <SeriesPreview selectedTeam={selectedTeam} series={seriesSchedule} />
      )}
    </Widget>
  );
};

export default SeriesData;
