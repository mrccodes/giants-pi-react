import { LiveFeedData } from 'mlb-api/live-feed';
import { useEffect, useMemo, useRef, useState } from 'react';
import { isAxiosError } from 'axios';

import { getLiveFeedData } from '../services/mlbApi';
import { logError } from '../utils';
import { DEBUG_MODE } from '../config';

interface useLiveFeedDataReturnType {
  liveData?: LiveFeedData['liveData'];
  gameData?: LiveFeedData['gameData'];
  metaData?: LiveFeedData['metaData'];
  error?: string;
  loading: boolean;
}

const useLiveFeedData = (gamePk: string): useLiveFeedDataReturnType => {
  const memoGamePk = useMemo<string>(() => gamePk, [gamePk]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [liveData, setLiveData] = useState<
    LiveFeedData['liveData'] | undefined
  >(undefined);
  const [metaData, setMetaData] = useState<
    LiveFeedData['metaData'] | undefined
  >(undefined);
  const [gameData, setGameData] = useState<
    LiveFeedData['gameData'] | undefined
  >(undefined);
  const initialRender = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const liveFeedData = await getLiveFeedData(memoGamePk);
        setLiveData(liveFeedData.liveData);
        setGameData(liveFeedData.gameData);
        setMetaData(liveFeedData.metaData);
      } catch (err) {
        if (isAxiosError(err) || err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error: unknown error occured');
          DEBUG_MODE &&
            logError(error, 'useLiveFeedData -> useEffect -> fetchData');
        }
      }
      setLoading(false);
    };
    if (initialRender.current === true) {
      // On initial render, set loading and init immediately.
      setLoading(true);
      fetchData();
      initialRender.current = false;
      return;
    }

    const intervalId = setInterval(fetchData, 2000);
    return () => {
      clearInterval(intervalId);
      setLiveData(undefined);
      setGameData(undefined);
      setMetaData(undefined);
      setError(undefined);
      setLoading(false);
    };
  }, [error, memoGamePk]);

  return {
    gameData,
    liveData,
    metaData,
    loading,
    error,
  };
};
export default useLiveFeedData;
