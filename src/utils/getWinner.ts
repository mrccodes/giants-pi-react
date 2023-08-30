import { Game, Team } from 'mlb-api';

const getWinner = (game: Game): Team => {
  const teams = Object.values(game.teams);
  return teams.reduce((max, t) => (t.score > max.score ? t : max), teams[0]);
};

export default getWinner;
