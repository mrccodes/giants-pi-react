import { useEffect, useState } from 'react';
import { Game, GameDate } from 'mlb-api';

import { MLBTeam } from '../models';
import { findOpposingTeam, findSeries, findSeriesScore } from '../utils';

interface useScheduleDataReturnType {
  seriesSchedule: Game[];
  selectedTeamScore: number;
  opposingTeamScore: number;
  opposingTeamName: string;
}

const useSeriesData = (
  schedule: GameDate[],
  selectedTeam: MLBTeam,
  targetGame: Game,
): useScheduleDataReturnType => {
  const [seriesSchedule, setSeriesSchedule] = useState<Game[]>(
    findSeries(schedule, selectedTeam, targetGame),
  );
  const [selectedTeamScore, setSelectedTeamScore] = useState<number>(
    findSeriesScore(selectedTeam.name, seriesSchedule),
  );

  const [opposingTeamName, setOpposingTeamName] = useState<string>(
    findOpposingTeam(targetGame, selectedTeam)?.team.name ?? '',
  );

  const [opposingTeamScore, setOpposingTeamScore] = useState<number>(
    findSeriesScore(opposingTeamName, seriesSchedule),
  );

  useEffect(() => {
    const updatedSeries = findSeries(schedule, selectedTeam, targetGame);

    setSeriesSchedule(updatedSeries);

    setSelectedTeamScore(findSeriesScore(selectedTeam.name, updatedSeries));

    const opposingTeamName =
      findOpposingTeam(targetGame, selectedTeam)?.team.name ?? '';

    setOpposingTeamName(opposingTeamName);

    setOpposingTeamScore(findSeriesScore(opposingTeamName, updatedSeries));
  }, [schedule, selectedTeam, targetGame]);

  return {
    seriesSchedule,
    selectedTeamScore,
    opposingTeamScore,
    opposingTeamName,
  };
};

export default useSeriesData;
