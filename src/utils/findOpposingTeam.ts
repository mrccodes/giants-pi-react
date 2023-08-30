import { Game, Team } from 'mlb-api';

import { MLBTeam } from '../models';

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
