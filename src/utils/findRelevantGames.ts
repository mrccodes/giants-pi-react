import { GameDate, Game } from "mlb-api";
import moment from 'moment';

/**
 * 
 * @param dates GameDate[]
 * @returns most recently finished game and the next game yet to begin
 */
const findRelevantGames = (dates: GameDate[]): { mostRecentGame: Game | undefined, nextGame: Game | undefined } => {
  let mostRecentGame: Game | undefined = undefined;
  let nextGame: Game | undefined = undefined;

  const current = moment();

  const sorted = dates.sort((a, b) => moment(a.date).isBefore(moment(b.date)) ? -1 : 1);

  for (const day of sorted) {
    if (day.games.length > 0) {
      for (const game of day.games) {
        const gameTime = moment(game.gameDate);

        if (!mostRecentGame && current.isAfter(gameTime)) {
          mostRecentGame = game;
        }
        
        if (!nextGame && current.isBefore(gameTime)) {
          nextGame = game;
        }

        if (mostRecentGame && nextGame) {
          return { mostRecentGame, nextGame };
        }
      }
    }
  }

  return { mostRecentGame, nextGame };
};

export default findRelevantGames;
