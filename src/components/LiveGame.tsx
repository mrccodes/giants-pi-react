import { Game } from 'mlb-api';
import { useState } from 'react';

import { findOpposingTeam } from '../utils';
import { GameScore, MLBTeam } from '../models';
import { getScore } from '../utils';
import abbreviateTeam from '../utils/abbreviateTeam';
import Scorecard from './Scorecard';
import Widget from './Widget';

interface LiveGameProps extends React.HTMLProps<HTMLDivElement> {
  game: Game;
  team: MLBTeam;
}

const LiveGame = ({ game, team, ...rest }: LiveGameProps) => {
  const [opposingTeamName] = useState<string | undefined>(
    findOpposingTeam(game, team)?.team.name,
  );
  const [currentScore] = useState<GameScore | null>(getScore(game, team));

  let borderColor: 'border-green-600' | 'border-red-600' | undefined;
  if (!currentScore) {
    borderColor = undefined;
  } else {
    borderColor =
      currentScore.selected.score > currentScore.opposing.score
        ? 'border-green-600'
        : currentScore.selected.score < currentScore.opposing.score
        ? 'border-red-600'
        : undefined;
  }
  return (
    <Widget borderColor={borderColor} {...rest}>
      <div className="w-full text-center font-extrabold">
        {opposingTeamName && <p>Currently facing the {opposingTeamName}</p>}
        <p className="text-green-500 py-2">
          {game.status.detailedState === 'In Progress'
            ? 'Live now!'
            : game.status.detailedState === 'Warmup'
            ? 'Warming up!'
            : 'Starting soon!'}
        </p>
      </div>
      {currentScore && (
        <Scorecard
          selectedTeamName={abbreviateTeam(currentScore.selected.teamName)}
          opposingTeamName={abbreviateTeam(currentScore.opposing.teamName)}
          selectedTeamScore={currentScore.selected.score}
          opposingTeamScore={currentScore.opposing.score}
        />
      )}
    </Widget>
  );
};

export default LiveGame;
