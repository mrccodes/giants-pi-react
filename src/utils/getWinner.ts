import { Team, Game } from 'mlb-api/schedule';

/**
 * Gets the winning team of a game
 */
const getWinner = (game: Game): Team => {
  const teams = Object.values(game.teams);
  return teams.reduce((max, t) => (t.score > max.score ? t : max), teams[0]);
};

export default getWinner;
