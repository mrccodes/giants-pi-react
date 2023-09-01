import { Team, CompletedGame } from 'mlb-api';

/**
 * Gets the winning team of a game
 */
const getWinner = (game: CompletedGame): Team => {
  const teams = Object.values(game.teams);
  return teams.reduce((max, t) => (t.score > max.score ? t : max), teams[0]);
};

export default getWinner;
