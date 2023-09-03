import { HTMLProps } from 'react';
import { Count, LiveFeedData } from 'mlb-api';

import { useLiveFeedData } from '../hooks';
import { ErrorMessage, LoadingSpinner, Widget, MenOnBase } from '.';
import { abbreviateTeam, ensureMinArrayLength, generateKey } from '../utils';
import { MLBTeam } from '../models';

interface BoxscoreProps extends HTMLProps<HTMLDivElement> {
  gamePk: string;
  team: MLBTeam;
}

const Boxscore = ({ gamePk, team, ...rest }: BoxscoreProps) => {
  const { gameData, liveData, error, loading } = useLiveFeedData(gamePk);

  if (gameData?.status.detailedState !== 'In Progress') {
    return null;
  }
  console.log({ liveData });
  if (error) {
    return (
      <Widget {...rest}>
        <ErrorMessage message={error} />
      </Widget>
    );
  }

  if (loading) {
    return (
      <Widget {...rest}>
        <LoadingSpinner variant="linear" />
      </Widget>
    );
  }

  if (gameData && liveData) {
    return (
      <Widget {...rest}>
        <div className="flex gap-2">
          {createBoxscore(liveData, team)}
          <CountDisplay
            className="pt-4"
            count={{
              balls: liveData.linescore.balls,
              strikes: liveData.linescore.strikes,
              outs: liveData.linescore.outs,
            }}
          />
          <div className="mt-6 mx-2">
            <MenOnBase
              first={liveData.plays.currentPlay.matchup?.postOnFirst}
              second={liveData.plays.currentPlay.matchup?.postOnSecond}
              third={liveData.plays.currentPlay.matchup?.postOnThird}
            />
          </div>
        </div>
      </Widget>
    );
  }

  return null;
};

const createBoxscore = (
  data: LiveFeedData['liveData'],
  selectedTeam: MLBTeam,
): React.ReactNode => {
  const innings = ensureMinArrayLength(data.linescore.innings, 9, null);
  const selectedTeamLoc =
    data.boxscore.teams.home.team.name === selectedTeam.name ? 'home' : 'away';
  const opposingTeamLoc =
    data.boxscore.teams.home.team.name === selectedTeam.name ? 'away' : 'home';
  return (
    <div className="flex flex-nowrap text-lg font-light">
      <div className="grid-cols-1 grid-rows-3">
        <div className="w-8 text-sm">&nbsp;</div>
        <div className="w-8 aspect-square flex items-center justify-center">
          {abbreviateTeam(data.boxscore.teams[selectedTeamLoc].team.name)}
        </div>
        <div className="w-8 aspect-square flex items-center justify-center">
          {abbreviateTeam(data.boxscore.teams[opposingTeamLoc].team.name)}
        </div>
      </div>
      {innings.map((inning, idx) =>
        inning ? (
          <Stack
            key={generateKey()}
            selectedTeamValue={inning[selectedTeamLoc].runs}
            opposingTeamValue={inning[opposingTeamLoc].runs}
            inning={inning.num}
          />
        ) : (
          <Stack key={generateKey()} inning={idx + 1} />
        ),
      )}
    </div>
  );
};

interface CountDisplayProps extends HTMLProps<HTMLDivElement> {
  count: Count;
}

const CountDisplay = ({ count, ...rest }: CountDisplayProps) => {
  return (
    <div {...rest}>
      <div>B: {count.balls ?? 0}</div>
      <div>S: {count.strikes ?? 0}</div>
      <div>O: {count.outs ?? 0}</div>
    </div>
  );
};

interface StackProps {
  inning?: number;
  selectedTeamValue?: number;
  opposingTeamValue?: number;
  border?: boolean;
}
const Stack = ({
  selectedTeamValue,
  opposingTeamValue,
  inning,
  border,
}: StackProps) => {
  return (
    <div className="grid-cols-1 grid-rows-3">
      <div className="w-8 w-8 flex justify-center text-sm">
        {inning ? inning : <span>&nbsp;</span>}
      </div>
      <Box border={border} value={selectedTeamValue} />
      <Box border={border} value={opposingTeamValue} />
    </div>
  );
};

interface BoxProps {
  value?: number | string;
  border?: boolean;
  text?: 'sm' | 'lg';
}
const Box = ({ value }: BoxProps) => {
  return (
    <div
      className={
        'border border-slate-100 aspect-square	w-8 flex items-center justify-center'
      }
    >
      {value === undefined ? <span>&nbsp;</span> : value}
    </div>
  );
};

export default Boxscore;
