import { Game, GameDate } from 'mlb-api';

const reduceScheduleToGames = (schedule: GameDate[]): Game[] => {
  const allGames: Game[] = [];
  schedule.forEach((day) => {
    day.games.forEach((g) => allGames.push(g));
  });
  return allGames;
};

export default reduceScheduleToGames;
