import { GameDate, Game } from 'mlb-api';
import moment from 'moment';

import reduceScheduleToGames from './reduceScheduleToGames';

/**
 * Finds relevant games on the schedule (next upcoming game and most recently completed game)
 * @param dates GameDate[]
 * @returns most recently finished game and the next game yet to begin
 */
const findRelevantGames = (
  dates: GameDate[],
): { mostRecentGame: Game | undefined; nextGame: Game | undefined } => {
  let mostRecentGame: Game | undefined = undefined;
  let nextGame: Game | undefined = undefined;

  const current = moment();

  const allGames = reduceScheduleToGames(dates);

  for (const game of allGames) {
    const gameTime = moment(game.gameDate);

    // Since array is sorted, ovverrite each completed game until no more are found
    if (
      current.isAfter(gameTime) &&
      game.status.abstractGameState === 'Final'
    ) {
      mostRecentGame = game;
    }

    // Set next game as the first game found that begins after current time
    if (!nextGame && current.isBefore(gameTime)) {
      nextGame = game;
    }
  }

  return { mostRecentGame, nextGame };
};

export default findRelevantGames;
