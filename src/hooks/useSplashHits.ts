import { useEffect, useRef, useState } from 'react';
import { isAxiosError } from 'axios';
import { LiveFeedData } from 'mlb-api/live-feed';

import { getSplashHits } from '../services';
import { logError } from '../utils';
import { SplashHit } from '../models';

interface useSplashHitsReturnType {
  total?: number;
  list?: SplashHit[];
  loading: boolean;
  error?: string;
}

const useSplashHits = (liveGame?: LiveFeedData): useSplashHitsReturnType => {
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [list, setList] = useState<SplashHit[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const initialRender = useRef(true);

  useEffect(() => {
    const init = async () => {
      try {
        initialRender.current && setLoading(true);
        const splashHits = await getSplashHits();
        setTotal(splashHits.total);
        setList(splashHits.list.sort((a, b) => (a < b ? -1 : 1)));
        setLoading(false);
        initialRender.current = false;
      } catch (err) {
        if (isAxiosError(err) || err instanceof Error) {
          setError(err.message);
        } else {
          logError(err, 'useSplashHits -> init');
        }
      }
    };
    init();
    const interval = setInterval(init, 600000);
    return () => {
      clearInterval(interval);
      setLoading(false);
      setError(undefined);
    };
  }, [liveGame, initialRender]);

  return {
    list,
    total,
    error,
    loading,
  };
};

export default useSplashHits;
