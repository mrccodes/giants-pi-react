import { Game, GameDate } from 'mlb-api/schedule';
import { Team } from 'mlb-api/teams';

import { abbreviateTeam } from '../utils';
import { Scorecard, Widget, SeriesPreview } from '.';
import { useSeriesData } from '../hooks';

interface SeriesDataProps extends React.HTMLProps<HTMLDivElement> {
  schedule: GameDate[];
  selectedTeam: Team;
  targetGame: Game;
  label: string;
  loading?: boolean;
}

const SeriesData = ({
  schedule,
  selectedTeam,
  targetGame,
  label,
  loading,
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
      : selectedTeamScore < opposingTeamScore
      ? 'border-red-600'
      : undefined;

  return (
    <Widget loading={loading} {...rest} borderColor={borderColor}>
      <p className="text-center text-xl">{label}</p>
      <Scorecard
        className="py-1"
        selectedTeamName={abbreviateTeam(selectedTeam.name)}
        opposingTeamName={abbreviateTeam(opposingTeamName)}
        opposingTeamScore={opposingTeamScore}
        selectedTeamScore={selectedTeamScore}
      />
      <SeriesPreview selectedTeam={selectedTeam} series={seriesSchedule} />
    </Widget>
  );
};

export default SeriesData;
