import { Game } from 'mlb-api';
import { useState } from 'react';

import { findOpposingTeam } from '../utils';
import { GameScore, MLBTeam } from '../models';
import { getScore } from '../utils';
import abbreviateTeam from '../utils/abbreviateTeam';
import Scorecard from './Scorecard';

interface LiveGameProps extends React.HTMLProps<HTMLDivElement> {
  game: Game;
  team: MLBTeam;
}

const LiveGame = ({ game, team, ...rest }: LiveGameProps) => {
  const [opposingTeamName] = useState<string | undefined>(
    findOpposingTeam(game, team)?.team.name,
  );
  const [currentScore] = useState<GameScore | null>(getScore(game, team));

  return (
    <div {...rest}>
      <div className="w-full text-center">{getText(opposingTeamName)}</div>
      {currentScore && (
        <Scorecard
          selectedTeamName={abbreviateTeam(currentScore.selected.teamName)}
          opposingTeamName={abbreviateTeam(currentScore.opposing.teamName)}
          selectedTeamScore={currentScore.selected.score}
          opposingTeamScore={currentScore.opposing.score}
        />
      )}
    </div>
  );
};

export default LiveGame;

const getText = (teamName: string | undefined): React.ReactNode =>
  teamName ? (
    <>
      <p>Currently facing the {teamName}</p>
      <p className="text-green-500">Live now!</p>
    </>
  ) : (
    'Game is live now!'
  );
