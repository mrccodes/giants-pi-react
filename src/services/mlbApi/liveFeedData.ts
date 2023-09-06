import { LiveFeedData } from 'mlb-api/live-feed';
import axios from 'axios';

import { MLB_API_BASE_URL } from '.';
import { isLiveFeedData } from '../../utils';
import { DEBUG_MODE } from '../../config';

/**
 *
 * @param gamePk game PK as recieved from the stats API for game
 * @returns boxscore
 */
const getLiveFeedData = async (gamePk: string): Promise<LiveFeedData> => {
  const url = `${MLB_API_BASE_URL}/v1.1/game/${gamePk}/feed/live`;
  try {
    const response = await axios.get(url);
    if (isLiveFeedData(response.data)) {
      const data = response.data as LiveFeedData;
      DEBUG_MODE === 'true' && logEventTypes(data);
      return data;
    } else {
      throw new Error('Response not of type LivefeedData');
    }
  } catch (error) {
    console.error('Error fetching game live feed data:', error);
    throw error;
  }
};

export default getLiveFeedData;

/* eslint-disable @typescript-eslint/no-explicit-any */
const logEventTypes = (data: LiveFeedData) => {
  const types: string[] = [];
  const events: any[] = [];

  data.liveData.plays.allPlays.forEach((play) => {
    const ev = play.playEvents as Array<any>;
    ev.forEach((pe) => {
      if (
        pe?.type &&
        !types.includes(pe.type) &&
        pe.type.toLowerCase() !== 'pitch' &&
        pe.type.toLowerCase() !== 'action' &&
        pe.type.toLowerCase() !== 'no_pitch' &&
        pe.type.toLowerCase() !== 'stepoff' &&
        pe.type.toLowerCase() !== 'pickoff'
      ) {
        events.push(pe);
        types.push(pe.type);
      }
    });
  });

  events.length > 0 &&
    console.warn('Warning: Unknown play types found: \n', { events });
};
/* eslint-enable @typescript-eslint/no-explicit-any */
