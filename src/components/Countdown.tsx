import React, { useState, useEffect, HTMLProps } from 'react';
import moment from 'moment';

import LoadingSpinner from './LoadingSpinner';

interface CountdownProps extends HTMLProps<HTMLDivElement> {
  targetDate: moment.Moment;

}

const Countdown: React.FC<CountdownProps> = ({ targetDate, ...rest }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const timeDifference = targetDate.diff(now);

      if (timeDifference < 0) {
        clearInterval(interval);
        setTimeLeft('00:00:00');
        return;
      }

      const duration = moment.duration(timeDifference);
      const hours = String(duration.hours()).padStart(2, '0');
      const minutes = String(duration.minutes()).padStart(2, '0');
      const seconds = String(duration.seconds()).padStart(2, '0');

      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft ? (
    <div {...rest}>
      {timeLeft}
    </div>
  ) : <LoadingSpinner />;
};

export default Countdown;
