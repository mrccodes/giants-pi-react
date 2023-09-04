import { Game } from 'mlb-api';

import { MLBTeam } from '../models';
import { getScore, getWinner, isCompletedScheduleGame } from '../utils';
import GamePreview from './GamePreview';

interface SeriesPreviewProps {
  selectedTeam: MLBTeam;
  series: Game[];
}
const SeriesPreview = ({ selectedTeam, series }: SeriesPreviewProps) => {
  return (
    <div className="rounded overflow-hidden">
      {series.map((g, index) => {
        if (isCompletedScheduleGame(g, false)) {
          const winner = getWinner(g);
          const score = getScore(g, selectedTeam);
          return (
            <GamePreview
              key={g.gameGuid}
              isWin={winner.team.name === selectedTeam.name}
              noBorder={index === series.length - 1}
              score={score ?? undefined}
              game={g}
            />
          );
        } else {
          return (
            <GamePreview
              key={g.gameGuid}
              noBorder={index === series.length - 1}
              game={g}
            />
          );
        }
      })}
    </div>
  );
};

export default SeriesPreview;
