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
    // If the current game is the first game in the array, there are no earlier games
    // available to search for previous series
    throw new Error('findPreviousSeries -> no previous game found');
  }
  const currentOpp = findOpposingTeam(currentGame, selectedTeam)?.team.name;
  const currentGameIdx = allGames.findIndex(
    (g) => findOpposingTeam(g, selectedTeam)?.team.name === currentOpp,
  );
  if (currentGameIdx < 0) {
    // Either current opponent or a game against them was not found
    throw new Error('findPreviousSeries -> no current game found');
  }
  let previousIdx = -1;

  // starting at the current game, search backwards until a different opponent is found
  for (let i = currentGameIdx; i >= 0; i--) {
    if (findOpposingTeam(allGames[i], selectedTeam)?.team.name !== currentOpp) {
      previousIdx = i;
      break;
    }
  }

  if (previousIdx < 0) {
    // No completed games against target team found
    throw new Error('findPreviousSeries -> no previous game found');
  }

  return allGames[previousIdx];
};

export default findEndOfPreviousSeriesGame;
