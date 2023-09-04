import { HTMLProps } from 'react';

import { useLiveFeedData } from '../hooks';
import {
  ErrorMessage,
  Widget,
  MenOnBase,
  Boxscore,
  CountDisplay,
} from '../components';
import { MLBTeam } from '../models';

interface LiveFeedProps extends HTMLProps<HTMLDivElement> {
  gamePk: string;
  team: MLBTeam;
}

// @TODO add play-by-play
/**
 * LiveFeed Component
 *
 * Gets and renders live feed data in the form of a line/boxscore, men-on-base diagram, and balls/outs/strikes data
 */
const LiveFeed = ({ gamePk, team, ...rest }: LiveFeedProps) => {
  const { gameData, liveData, error, loading } = useLiveFeedData(gamePk);

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
    <Widget loading={!liveData || !gameData || loading} {...rest}>
      <div className="flex gap-2">
        {liveData && (
          <>
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
              className="mt-7 mx-2"
              first={liveData.plays.currentPlay.matchup?.postOnFirst}
              second={liveData.plays.currentPlay.matchup?.postOnSecond}
              third={liveData.plays.currentPlay.matchup?.postOnThird}
            />
          </>
        )}
      </div>
    </Widget>
  );
};

export default LiveFeed;
