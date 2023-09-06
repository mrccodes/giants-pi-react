import { CompletedGame, Game } from 'mlb-api/schedule';

import getWinner from './getWinner';

/**
 * Gets the number of games won in a series for given team
 * @param teamName team to get the score of
 * @param series collection of games denoting the series
 * @returns number
 */
const findSeriesScore = (teamName: string, series: Game[]): number => {
  let score = 0;

  series.forEach((g) => {
    if (g.status.abstractGameState === 'Final') {
      const winner = getWinner(g as CompletedGame);
      score = winner.team.name === teamName ? score + 1 : score;
    }
  });

  return score;
};

export default findSeriesScore;
