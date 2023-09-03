import { useCallback, useEffect, useRef, useState } from 'react';
import { Game, GameDate } from 'mlb-api';
import moment from 'moment';
import isEqual from 'lodash/isEqual';

import { MLBTeam } from '../models';
import { checkForLiveGame, getSchedule } from '../services/mlbApi';
import { findRelevantGames, reduceScheduleToGames } from '../utils';
import useLocalStorage from './useLocalStorage';

interface useTeamScheduleReturnType {
  loading: boolean;
  /**
   * Collection of game dates which may include one ore more games
   */
  schedule: GameDate[] | undefined;
  /**
   * The most recently completed game on the schedule
   */
  mostRecentGame: Game | undefined;
  /**
   * The next upcoming game on the schedule
   */
  nextGame: Game | undefined;
  /**
   * The live game currently being played, if any
   */
  liveGame: Game | undefined;
  /**
   * An error message
   */
  error?: string;
}

interface StoredSchedule {
  /**
   * Date time string of when the schedule was last fetched from the API
   */
  lastChecked: string;
  /**
   * The schedule data
   */
  data: GameDate[];
}

function useTeamSchedule(team: MLBTeam): useTeamScheduleReturnType {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [schedule, setSchedule] = useLocalStorage<StoredSchedule | null>(
    'schedule',
    null,
  );
  const [mostRecentGame, setMostRecentGame] = useState<Game | undefined>(
    undefined,
  );
  const [nextGame, setNextGame] = useState<Game | undefined>(undefined);
  const [liveGame, setLiveGame] = useState<Game | undefined>(undefined);
  const [shouldCheckForLiveGame, setShouldCheckForLiveGame] = useState<
    boolean | null
  >(null);
  const intitalCheckForLiveGame = useRef<boolean>(true);
  const intitalCheckForSchedule = useRef<boolean>(true);

  const updateStoredSchedule = useCallback(
    (newSchedule: GameDate[]) => {
      if (!isEqual(newSchedule, schedule?.data)) {
        setSchedule({
          data: newSchedule,
          lastChecked: moment().toISOString(),
        });
      }
    },
    [schedule?.data, setSchedule],
  );

  const updateLiveGame = useCallback(
    (newGame?: Game) => {
      if (!isEqual(newGame, liveGame)) {
        setLiveGame(newGame);
      }
    },
    [liveGame, setLiveGame],
  );

  useEffect(() => {
    if (!shouldCheckForLiveGame || !schedule) {
      return;
    }
    const fetchData = () => {
      // Only set loading state if initial load
      if (intitalCheckForLiveGame.current) {
        setLoading(true);
        intitalCheckForLiveGame.current = false;
      }
      checkForLiveGame(team, undefined, updateStoredSchedule)
        .then((res) => {
          updateLiveGame(res);
          setError(undefined);
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    };

    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, [
    shouldCheckForLiveGame,
    updateLiveGame,
    updateStoredSchedule,
    intitalCheckForLiveGame,
    team,
    schedule,
  ]);

  useEffect(() => {
    const fetchData = () => {
      if (!schedule || moment().diff(moment(schedule.lastChecked), 'h') >= 24) {
        if (intitalCheckForSchedule.current) {
          setLoading(true);
          intitalCheckForSchedule.current = false;
        }
        getSchedule(team)
          .then((res) => {
            const gameDates: GameDate[] = res.dates;
            const { nextGame, mostRecentGame } = findRelevantGames(gameDates);
            updateStoredSchedule(gameDates);
            setNextGame(nextGame);
            setMostRecentGame(mostRecentGame);
          })
          .catch((err) => setError(err))
          .finally(() => setLoading(false));
      } else {
        const { nextGame, mostRecentGame } = findRelevantGames(schedule.data);
        setNextGame(nextGame);
        setMostRecentGame(mostRecentGame);

        const today = schedule.data.find((day) =>
          moment(day.date).isSame(moment(), 'day'),
        );

        const allGames: Game[] = reduceScheduleToGames(schedule.data);
        const liveGameFound = allGames.some(
          (g) => g.status.abstractGameState === 'Live',
        );
        const startedRecently = today ? gameStartedRecently(today) : false;
        const startsSoon = today ? gameStartsSoon(today) : false;

        if (startsSoon || startedRecently || liveGameFound) {
          setShouldCheckForLiveGame(true);
        } else {
          setShouldCheckForLiveGame(false);
        }
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, [team, schedule, setSchedule, updateStoredSchedule]);

  return {
    loading,
    error,
    schedule: schedule?.data,
    mostRecentGame,
    nextGame,
    liveGame,
  };
}

/**
 * Checks if any games on the passed date were scheduled to start less than x hours ago
 *
 * @param schedule GameDate - current day
 * @param numberOfHours number of hours that defines 'recently'
 * @returns boolean
 */
const gameStartedRecently = (today: GameDate, numberOfHours = 3): boolean => {
  const now = moment();
  const limitTime = moment().subtract(numberOfHours, 'hours');

  return today.games.some((game) => {
    const gameTime = moment.utc(game.gameDate);
    return gameTime.isBefore(now) && gameTime.isAfter(limitTime);
  });
};
/**
 * Checks if any games on the passed date are scheduled to start within x hours
 *
 * @param schedule GameDate - current day
 * @param numberOfHours number of hours that defines 'recently'
 * @returns boolean
 */
const gameStartsSoon = (today: GameDate, numberOfHours = 1): boolean => {
  const now = moment();
  const limitTime = moment().add(numberOfHours, 'hours');

  return today.games.some((game) => {
    const gameTime = moment.utc(game.gameDate);
    return gameTime.isAfter(now) && gameTime.isBefore(limitTime);
  });
};

export default useTeamSchedule;
