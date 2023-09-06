import { Game, GameDate } from 'mlb-api/schedule';
import { Team } from 'mlb-api/teams';

import { findOpposingTeam, reduceScheduleToGames } from './index';

/**
 *
 * @param schedule collection of game dates
 * @param selectedTeam team user has selected
 * @param targetGame game to find series of
 * @returns all games in the series that the target game is in
 */
const findSeries = (
  schedule: GameDate[],
  selectedTeam: Team,
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

  // search backwards from target game until a game with different opposing team is found
  for (let i = targetGameIdx; i >= 0; i--) {
    const opp = findOpposingTeam(allGames[i], selectedTeam);
    if (opp?.team.name !== targetTeam?.team.name) {
      seriesStartIdx = i + 1;
      break;
    }
  }

  // search forwards from target game until a game with different opposing team is found
  for (let i = targetGameIdx; i < allGames.length; i++) {
    const opp = findOpposingTeam(allGames[i], selectedTeam);
    if (opp?.team.name !== targetTeam?.team.name) {
      seriesEndIdx = i - 1;
      break;
    }
  }

  // Since we default to 1 week past to 1 week future schedule, this shouldnt happen
  if (seriesStartIdx === null || seriesEndIdx === null) {
    console.error('findSeries -> Error finding series start/end');
    return [];
  }

  for (let i = seriesStartIdx; i <= seriesEndIdx; i++) {
    games.push(allGames[i]);
  }

  return games;
};

export default findSeries;
