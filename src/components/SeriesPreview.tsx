import { Game } from 'mlb-api';
import moment from 'moment';

import { GameScore, MLBTeam } from '../models';
import { getScore, getWinner } from '../utils';

interface SeriesPreviewProps {
  selectedTeam: MLBTeam;
  series: Game[];
}
export const SeriesPreview = ({ selectedTeam, series }: SeriesPreviewProps) => {
  console.log(series);
  return (
    <div className="rounded overflow-hidden">
      {series.map((g, index) => {
        const winner = getWinner(g);
        const score = getScore(g, selectedTeam);
        return g.status.abstractGameState === 'Final' ? (
          <div
            key={g.gameGuid}
            className={`${
              winner.team.name === selectedTeam.name
                ? 'bg-green-600'
                : 'bg-red-600'
            } ${
              index < series.length - 1 ? 'border-b border-slate-600' : ''
            } bg-opacity-25 px-2 flex justify-center gap-3`}
          >
            <span>{moment(g.gameDate).format('MM/DD')}</span>
            <span>
              {winner.team.name === selectedTeam.name ? 'Win' : 'Loss'}{' '}
              {formatScore(score)}
            </span>
          </div>
        ) : null;
      })}
    </div>
  );
};

const formatScore = (score?: GameScore | null): string =>
  score ? `${score.selected.score}-${score.opposing.score}` : 'No Unknown';
