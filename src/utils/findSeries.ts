import { Game, GameDate } from 'mlb-api';

import { findOpposingTeam } from './index';
import { MLBTeam } from '../models';

const findSeries = (
  schedule: GameDate[],
  selectedTeam: MLBTeam,
  targetGame: Game,
): Game[] => {
  const allGames: Game[] = [];
  const games: Game[] = [];
  schedule.forEach((day) => {
    day.games.forEach((g) => allGames.push(g));
  });

  const targetGameIdx = allGames.findIndex(
    (g) => g.gameGuid === targetGame.gameGuid,
  );

  if (targetGameIdx < 0) {
    console.error(
      'useScheduleData -> Out of bounds target game passed to findSeries',
    );
    return [];
  }

  let seriesStartIdx: number | null = null;
  let seriesEndIdx: number | null = null;
  const targetTeam = findOpposingTeam(targetGame, selectedTeam);

  for (let i = targetGameIdx; i >= 0; i--) {
    const opp = findOpposingTeam(allGames[i], selectedTeam);
    if (opp?.team.name !== targetTeam?.team.name) {
      seriesStartIdx = i + 1;
      break;
    }
  }

  for (let i = targetGameIdx; i < allGames.length; i++) {
    const opp = findOpposingTeam(allGames[i], selectedTeam);
    if (opp?.team.name !== targetTeam?.team.name) {
      seriesEndIdx = i - 1;
      break;
    }
  }

  if (seriesStartIdx === null || seriesEndIdx === null) {
    console.error('useScheduleData -> Error finding series start/end');
    return [];
  }

  for (let i = seriesStartIdx; i <= seriesEndIdx; i++) {
    games.push(allGames[i]);
  }

  return games;
};

export default findSeries;
