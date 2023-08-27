import React, { useState } from 'react'
import moment from 'moment';
import { Game } from 'mlb-api';

import { Countdown, ErrorMessage, LoadingSpinner } from '../../components';
import { useTeamSchedule } from '../../hooks';
import { MLBTeam } from '../../models';
import { findOpposingTeam } from '../../utils';

interface NextGameCountdownProps extends React.HTMLProps<HTMLDivElement> {
    team: MLBTeam;
}
const NextGameCountdown = ({ team, ...rest }: NextGameCountdownProps) => {
  const { liveGame, nextGame, loading, error } = useTeamSchedule(team);
  const [opposingTeamError, setOpposingTeamError] = useState<string>('')

  const formatOpposingTeam = (liveGame: Game, team: MLBTeam) => {
    const opposing = findOpposingTeam(liveGame, team)?.team.name;
    !opposing && setOpposingTeamError('Error finding opposing team for game')
    return opposing ?? 'No Team Found';
  }

  return loading ?
    <LoadingSpinner className='mx-auto my-0 h-full w-auto' /> : error || opposingTeamError ? 
    <ErrorMessage message={error ?? opposingTeamError} /> :
    <div {...rest}>
      {liveGame && (
        <p>Game against {formatOpposingTeam(liveGame, team)} is live now!</p>
      )}
      {!liveGame && nextGame && (
        <>
          <p className='text-sm font-light'>Facing the {formatOpposingTeam(nextGame, team)} in...</p>
          <Countdown
          className='text-4xl'
          targetDate={moment(nextGame.gameDate)} 
          />
        </>
      )}
   </div>
}

export default NextGameCountdown;