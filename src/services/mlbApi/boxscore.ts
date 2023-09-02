import { LiveFeedData } from 'mlb-api';
import axios from 'axios';

import { MLB_API_BASE_URL } from '.';
import { isLiveFeedData } from '../../utils';

/**
 *
 * @param gamePk game PK as recieved from the stats API for game
 * @returns boxscore
 */
const getLiveFeedData = async (gamePk: string): Promise<LiveFeedData> => {
  const url = `${MLB_API_BASE_URL}/v1.1/game/${gamePk}/feed/live`;
  try {
    const response = await axios.get(url);
    console.log('LIVE FEED DATA: ', response.data)
    if (isLiveFeedData(response.data)) {
      return response.data as LiveFeedData;
    } else {
      throw new Error('Response not of type LivefeedData');
    }
  } catch (error) {
    console.error('Error fetching game live feed data:', error);
    throw error;
  }
};

export default getLiveFeedData;
