import { Game } from 'mlb-api';
import moment from 'moment';

import { GameScore } from '../models';

interface GamePreviewProps {
  game: Game;
  noBorder: boolean;
  score?: GameScore;
  isWin?: boolean;
}
const GamePreview = ({
  game,
  isWin,
  score,
  noBorder = false,
}: GamePreviewProps) => {
  const classes = `${
    isWin === undefined ? 'bg-slate-800' : isWin ? 'bg-green-600' : 'bg-red-600'
  } 
    ${
      !noBorder ? 'border-b border-slate-600' : ''
    } bg-opacity-25 px-2 flex justify-center gap-3`;

  return (
    <div className={classes}>
      <span>{moment(game.gameDate).format('MM/DD')}</span>
      {isWin !== undefined ? (
        <span>
          {isWin ? 'Win' : 'Loss'} {formatScore(score)}
        </span>
      ) : (
        <span>TBD</span>
      )}
    </div>
  );
};

const formatScore = (score?: GameScore | null): string =>
  score ? `${score.selected.score}-${score.opposing.score}` : 'Score Unknown';

export default GamePreview;
