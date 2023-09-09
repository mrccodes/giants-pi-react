import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Team } from 'mlb-api/teams';
import { Game } from 'mlb-api/schedule';

import { Countdown, ErrorMessage, Widget } from '../components';
import { abbreviateTeam, findOpposingTeam } from '../utils';

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
        <p className="text-2xl font-bold text-center">Upcoming Game</p>
        <p className="text-3xl text-center font-light my-6">
          {opposingTeamName ? (
            <span className="flex align-center justify-center">
              <span className="text-4xl font-medium">
                {abbreviateTeam(team.name)}
              </span>
              &nbsp;&nbsp;vs&nbsp;&nbsp;
              <span className="text-4xl font-medium">
                {abbreviateTeam(opposingTeamName)}
              </span>
            </span>
          ) : (
            'Next game starts in'
          )}
        </p>
        <Countdown
          className="text-6xl text-center"
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
