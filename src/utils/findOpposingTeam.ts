import { Game, Team as ScheduleTeam } from 'mlb-api/schedule';
import { Team } from 'mlb-api/teams';

/**
 * Gets the team scheduled to play in game who is not the selected team
 * @param game
 * @param selectedTeam
 * @returns
 */
const findOpposingTeam = (
  game: Game,
  selectedTeam: Team,
): ScheduleTeam | undefined => {
  const team = Object.values(game.teams).find(
    (team) => team.team.id !== Number(selectedTeam.id),
  );
  return team;
};

export default findOpposingTeam;
