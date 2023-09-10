import axios from 'axios';

import { HOST, NODE_PORT, VITE_MODE } from '../config';
import { SplashHit } from '../models';

interface getSplashHitsResponse {
  list: SplashHit[];
  total: number;
}
const getSplashHits = async (): Promise<getSplashHitsResponse> => {
  const url =
    VITE_MODE === 'production'
      ? `/splash-hits`
      : `${HOST}:${NODE_PORT}/splash-hits`;
  return axios.get(url).then((res) => res.data);
};

export default getSplashHits;
