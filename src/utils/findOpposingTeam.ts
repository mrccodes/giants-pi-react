import { Game, Team } from 'mlb-api';

import { MLBTeam } from '../models';

/**
 * Gets the team scheduled to play in game who is not the selected team
 * @param game
 * @param selectedTeam
 * @returns
 */
const findOpposingTeam = (
  game: Game,
  selectedTeam: MLBTeam,
): Team | undefined => {
  const team = Object.values(game.teams).find(
    (team) => team.team.id !== Number(selectedTeam.id),
  );
  return team;
};

export default findOpposingTeam;
