import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Team } from 'mlb-api/teams';
import { Game } from 'mlb-api/schedule';

import { Countdown, ErrorMessage, Widget } from '../components';
import { findOpposingTeam } from '../utils';

interface NextGameCountdownProps extends React.HTMLProps<HTMLDivElement> {
  team: Team;
  nextGame?: Game;
  error?: string;
}
const NextGameCountdown = ({
  team,
  nextGame,
  error,
  ...rest
}: NextGameCountdownProps) => {
  const [opposingTeamName, setOpposingTeam] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!nextGame) return;

    setOpposingTeam(findOpposingTeam(nextGame, team)?.team.name);
  }, [nextGame, team]);

  return error ? (
    <ErrorMessage message={error} />
  ) : nextGame ? (
    <Widget {...rest}>
      <>
        <p className="text-sm font-light mb-2">
          {opposingTeamName
            ? `${team.name} VS ${opposingTeamName} in`
            : 'Next game starts in'}
        </p>
        <Countdown
          className="text-4xl"
          targetDate={moment(nextGame.gameDate)}
        />
      </>
    </Widget>
  ) : (
    <Widget {...rest}>
      <p>No upcoming games</p>
    </Widget>
  );
};

export default NextGameCountdown;
