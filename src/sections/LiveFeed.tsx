import { HTMLProps, useState } from 'react';
import { Game } from 'mlb-api/schedule';
import { Team } from 'mlb-api/teams';

import { useLiveFeedData } from '../hooks';
import {
  ErrorMessage,
  Widget,
  MenOnBase,
  Boxscore,
  CountDisplay,
  PlayByPlay,
  Scorecard,
} from '../components';
import { GameScore } from '../models';
import { abbreviateTeam, findOpposingTeam, getScore } from '../utils';

interface LiveFeedProps extends HTMLProps<HTMLDivElement> {
  game: Game;
  team: Team;
}

// @TODO add play-by-play
/**
 * LiveFeed Component
 *
 * Gets and renders live feed data in the form of a line/boxscore, men-on-base diagram, and balls/outs/strikes data
 */
const LiveFeed = ({ game, team, className, ...rest }: LiveFeedProps) => {
  const { gameData, liveData, error, loading } = useLiveFeedData(game.gamePk);
  const [opposingTeamName] = useState<string | undefined>(
    findOpposingTeam(game, team)?.team.name,
  );
  const [currentScore] = useState<GameScore | null>(getScore(game, team));

  if (error) {
    return (
      <Widget {...rest}>
        <ErrorMessage message={error} />
      </Widget>
    );
  }

  if (gameData && gameData.status.detailedState !== 'In Progress') {
    return null;
  }

  return (
    <Widget
      {...rest}
      className={`relative ${className}`}
      loading={!liveData || !gameData || !opposingTeamName || loading}
    >
      <div className="absolute border rounded border-green-400/75 px-2 py-1">
        Live!
      </div>
      <div className="flex gap-2">
        {liveData && (
          <>
            <div className="grid gap-2 auto-cols-fr">
              {currentScore && (
                <Scorecard
                  selectedTeamName={abbreviateTeam(
                    currentScore.selected.teamName,
                  )}
                  opposingTeamName={abbreviateTeam(
                    currentScore.opposing.teamName,
                  )}
                  selectedTeamScore={currentScore.selected.score}
                  opposingTeamScore={currentScore.opposing.score}
                />
              )}
              <div className="inline-flex gap-3 border border-slate-500 rounded px-4 py-2">
                <Boxscore selectedTeam={team} data={liveData} />
                <CountDisplay
                  className="pt-4"
                  count={{
                    balls: liveData.linescore.balls,
                    strikes: liveData.linescore.strikes,
                    outs: liveData.linescore.outs,
                  }}
                />
                <MenOnBase
                  className="mt-7 grow-0 shrink-0"
                  first={liveData.plays.currentPlay.matchup?.postOnFirst}
                  second={liveData.plays.currentPlay.matchup?.postOnSecond}
                  third={liveData.plays.currentPlay.matchup?.postOnThird}
                />
              </div>
            </div>
            <PlayByPlay
              className="flex-1 mx-auto"
              data={liveData.plays.allPlays}
            />
          </>
        )}
      </div>
    </Widget>
  );
};

export default LiveFeed;
