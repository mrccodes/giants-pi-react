import { Game, GameDate } from 'mlb-api/schedule';

import sortGamesByDate from './sortGamesByDate';

/**
 * Takes an array of GameDates and returns an array of Games, sorted by game date
 * @param schedule arry of GameDates
 * @returns array of Games
 */
const reduceScheduleToGames = (schedule: GameDate[]): Game[] => {
  const allGames: Game[] = [];
  schedule.forEach((day) => {
    day.games.forEach((g) => allGames.push(g));
  });

  const sorted = sortGamesByDate(allGames);
  return sorted;
};

export default reduceScheduleToGames;
