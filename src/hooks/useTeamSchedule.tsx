import { useEffect, useState } from 'react'
import { Game, GameDate } from 'mlb-api';

import { MLBTeam } from '../models'
import { checkForLiveGame, getSchedule } from '../services/mlbApi';
import { findRelevantGames } from '../utils';

interface useTeamScheduleReturnType {
    loading: boolean;
    error?: string;
    schedule: object | undefined;
    mostRecentGame: Game | undefined;
    nextGame: Game | undefined;
    liveGame: Game | undefined;
}

function useTeamSchedule(team: MLBTeam): useTeamScheduleReturnType {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined)
    const [schedule, setSchedule] = useState<GameDate[] | undefined>(undefined);
    const [mostRecentGame, setMostRecentGame] = useState<Game | undefined>(undefined);
    const [nextGame, setNextGame] = useState<Game | undefined>(undefined);
    const [liveGame, setLiveGame] = useState<Game | undefined>(undefined);

    useEffect(() => {
        if (schedule) {
            console.log(schedule[0])
        }
    }, [schedule])
    useEffect(() => {
      setLoading(true);
      getSchedule(team)
        .then(res => {
            const gameDates: GameDate[] = res.dates;
            const { nextGame, mostRecentGame } = findRelevantGames(gameDates);

            setSchedule(gameDates);
            setNextGame(nextGame);
            setMostRecentGame(mostRecentGame);
            return checkForLiveGame(team)
        })
        .then(game => {
            setLiveGame(game)
        })
        .catch(err => setError(err))
        .finally(() => setLoading(false))
    }, [team])
    
    return { 
        loading, 
        error, 
        schedule,
        mostRecentGame,
        nextGame,
        liveGame
    }
}


export default useTeamSchedule
