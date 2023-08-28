import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Game } from 'mlb-api';

import { Countdown, ErrorMessage } from '../../components';
import { MLBTeam } from '../../models';
import { findOpposingTeam } from '../../utils';

interface NextGameCountdownProps extends React.HTMLProps<HTMLDivElement> {
    team: MLBTeam;
    nextGame?: Game;
    error?: string;
}
const NextGameCountdown = ({ team, nextGame, error, ...rest }: NextGameCountdownProps) => {
  const [opposingTeamName, setOpposingTeam] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!nextGame) return;

    const opposingTeam = findOpposingTeam(nextGame, team);
    setOpposingTeam(opposingTeam ? opposingTeam.team.name : undefined)
  }, [nextGame, team])
 


  return error ? <ErrorMessage message={error} /> :
    nextGame ? 
      <div {...rest}>
        <>
          <p className='text-sm font-light mb-2'> 
            {opposingTeamName ? `${team.name} VS ${opposingTeamName} in` : 'Next game starts in'}
          </p>
          <Countdown
          className='text-4xl'
          targetDate={moment(nextGame.gameDate)} 
          />
        </>
   </div> : 
   <div {...rest}>
      <p>No upcoming games</p>
   </div>
}

export default NextGameCountdown;