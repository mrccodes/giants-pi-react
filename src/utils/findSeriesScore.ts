import { Game } from 'mlb-api';

import getWinner from './getWinner';

const findSeriesScore = (teamName: string, series: Game[]) => {
  let score = 0;

  series.forEach((g) => {
    if (g.status.abstractGameState === 'Final') {
      const winner = getWinner(g);
      score = winner.team.name === teamName ? score + 1 : score;
    }
  });

  return score;
};

export default findSeriesScore;
