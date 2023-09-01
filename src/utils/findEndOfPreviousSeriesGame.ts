import { Game } from 'mlb-api';

import { MLBTeam } from '../models';
import findOpposingTeam from './findOpposingTeam';

/**
 * Finds the completed game which marks the end of the most recently completed series
 *
 * throws an error if the currentGame passed does not exist, or is the first element of the allGames array
 * @param selectedTeam team the app is rendering data for
 * @param currentGame the game marking the
 * @param allGames
 * @returns
 */
const findEndOfPreviousSeriesGame = (
  selectedTeam: MLBTeam,
  currentGame: Game,
  allGames: Game[],
): Game => {
  if (allGames[0].gameGuid === currentGame.gameGuid) {
    throw new Error('findPreviousSeries -> no previous game found');
  }
  const currentOpp = findOpposingTeam(currentGame, selectedTeam)?.team.name;
  const currentGameIdx = allGames.findIndex(
    (g) => findOpposingTeam(g, selectedTeam)?.team.name === currentOpp,
  );
  if (currentGameIdx < 0) {
    throw new Error('findPreviousSeries -> no current game found');
  }
  let previousIdx = -1;

  for (let i = currentGameIdx; i >= 0; i--) {
    if (findOpposingTeam(allGames[i], selectedTeam)?.team.name !== currentOpp) {
      previousIdx = i;
      break;
    }
  }

  if (previousIdx < 0) {
    throw new Error('findPreviousSeries -> no previous game found');
  }

  return allGames[previousIdx];

  return allGames[previousIdx];
};

export default findEndOfPreviousSeriesGame;
