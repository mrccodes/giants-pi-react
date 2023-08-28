import { useEffect, useState } from 'react'
import { Game, GameDate } from 'mlb-api';
import moment from 'moment';

import { MLBTeam } from '../models'
import { checkForLiveGame, getSchedule } from '../services/mlbApi';
import { findRelevantGames } from '../utils';
import useLocalStorage from './useLocalStorage';

interface useTeamScheduleReturnType {
    loading: boolean;
    schedule: object | undefined;
    mostRecentGame: Game | undefined;
    nextGame: Game | undefined;
    liveGame: Game | undefined;
    error?: string;
}

interface StoredSchedule {
    lastChecked: string;
    data: GameDate[];
}

function useTeamSchedule(team: MLBTeam): useTeamScheduleReturnType {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined)
    const [schedule, setSchedule] = useLocalStorage<StoredSchedule | null>('schedule', null);
    const [mostRecentGame, setMostRecentGame] = useState<Game | undefined>(undefined);
    const [nextGame, setNextGame] = useState<Game | undefined>(undefined);
    const [liveGame, setLiveGame] = useState<Game | undefined>(undefined);
    const [shouldCheckForLiveGame, setShouldCheckForLiveGame] = useState<boolean | null>(null);

    useEffect(() => {
        if (!shouldCheckForLiveGame || !schedule) {
            return;
        }
        const fetchData = () => {
            // Only set loading state if initial load
            liveGame === null && setLoading(true);
            checkForLiveGame(team)
                .then(res => setLiveGame(res))
                .catch(err => setError(err))
                .finally(() => setLoading(false))
        }        
        
        fetchData();
        const intervalId = setInterval(fetchData, 60000);
        return () => clearInterval(intervalId);
    }, [
        shouldCheckForLiveGame, 
        schedule, 
        liveGame, 
        team
    ])

    useEffect(() => {
        const fetchData = () => {
            if (!schedule || moment().diff(moment(schedule.lastChecked), 'h') >= 24) {
                setLoading(true);
                getSchedule(team)
                  .then(res => {
                      const gameDates: GameDate[] = res.dates;
                      const { nextGame, mostRecentGame } = findRelevantGames(gameDates);
          
                      setSchedule({
                        data: gameDates,
                        lastChecked: moment().toISOString()
                      });
                      setNextGame(nextGame);
                      setMostRecentGame(mostRecentGame);
                  })
                  .catch(err => setError(err))
                  .finally(() => setLoading(false))
            } else {
                const { nextGame, mostRecentGame } = findRelevantGames(schedule.data);
                setNextGame(nextGame);
                setMostRecentGame(mostRecentGame);
                
                const today = schedule.data.find(day => moment(day.date).isSame(moment(), 'day'));
                if (today && gameStartedRecently(today)) {
                    // TODO increase number of hours if game is in overtime
                    setShouldCheckForLiveGame(true);
                }
            }
        }

        fetchData();
        const intervalId = setInterval(fetchData, 60000);
        return () => clearInterval(intervalId);
    }, [team, schedule, setSchedule])
    
    return { 
        loading, 
        error, 
        schedule: schedule?.data,
        mostRecentGame,
        nextGame,
        liveGame
    }
}

/**
 * Checks if a 
 * @param schedule GameDate - current day
 * @param numberOfHours number of hours that defines 'recently'
 * @returns boolean
 */
const gameStartedRecently = (today: GameDate, numberOfHours = 3): boolean => {
    return today ? today.games.some(game => moment().diff(moment(game.gameDate), 'h') < numberOfHours) : false;
}

export default useTeamSchedule
