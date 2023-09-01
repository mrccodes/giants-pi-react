import { Game, GameDate } from 'mlb-api';

import { findOpposingTeam, reduceScheduleToGames } from './index';
import { MLBTeam } from '../models';

const findSeries = (
  schedule: GameDate[],
  selectedTeam: MLBTeam,
  targetGame: Game,
): Game[] => {
  const games: Game[] = [];
  const allGames: Game[] = reduceScheduleToGames(schedule);

  const targetGameIdx = allGames.findIndex(
    (g) => g.gameGuid === targetGame.gameGuid,
  );

  if (targetGameIdx < 0) {
    console.error(
      'findSeries -> Out of bounds target game passed to findSeries',
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
    throw new Error('findSeries -> Error finding series start/end');
    return [];
  }

  for (let i = seriesStartIdx; i <= seriesEndIdx; i++) {
    games.push(allGames[i]);
  }

  return games;
};

export default findSeries;
