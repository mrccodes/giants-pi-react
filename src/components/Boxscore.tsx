import { LiveFeedData } from 'mlb-api/live-feed';
import { Team } from 'mlb-api/teams';

import { abbreviateTeam, ensureMinArrayLength, generateKey } from '../utils';

interface BoxscoreProps extends Omit<React.HTMLProps<HTMLDivElement>, 'data'> {
  data: LiveFeedData['liveData'];
  selectedTeam: Team;
}

/**
 * Boxscore Compoment (linescore)
 *
 * Component to display game data in the form of a linescore
 *
 * @example
 *
 *       1   2   3   4   5   6   7   8   9
 *     -------------------------------------
 *  SF | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 *  SD | 2 | 0 | 0 | 4 | 1 | 0 | 3 | 0 | 1 |
 *     -------------------------------------
 */
const Boxscore = ({
  data,
  selectedTeam,
  className,
  ...rest
}: BoxscoreProps): React.ReactNode => {
  const innings = ensureMinArrayLength(data.linescore.innings, 9, null);
  const selectedTeamLoc =
    data.boxscore.teams.home.team.name === selectedTeam.name ? 'home' : 'away';
  const opposingTeamLoc =
    data.boxscore.teams.home.team.name === selectedTeam.name ? 'away' : 'home';
  return (
    <div
      {...rest}
      className={`flex flex-nowrap text-lg font-light ${className}`}
    >
      <div className="grid-cols-1 grid-rows-3">
        <div className="w-8 text-sm">&nbsp;</div>
        <div className="w-8 aspect-square mr-2 flex items-center justify-center">
          {abbreviateTeam(data.boxscore.teams[selectedTeamLoc].team.name)}
        </div>
        <div className="w-8 aspect-square flex mr-2 items-center justify-center">
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
