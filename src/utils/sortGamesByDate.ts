import { Game } from 'mlb-api/schedule';
import moment from 'moment';

const sortGamesByDate = (games: Game[]): Game[] =>
  games.sort((a, b) =>
    moment(a.gameDate).isBefore(moment(b.gameDate)) ? -1 : 1,
  );

export default sortGamesByDate;
