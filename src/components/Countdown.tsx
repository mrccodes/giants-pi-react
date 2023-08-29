import { useState, useEffect, HTMLProps } from 'react';
import moment from 'moment-timezone';

interface CountdownProps extends HTMLProps<HTMLDivElement> {
  targetDate: moment.Moment;
}

const TIMER_FINISHED = '00:00:00';

/**
 * Renders a HH:MM:SS countdown to the target date
 */
const Countdown = ({ targetDate, ...rest }: CountdownProps) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  targetDate = moment.utc(targetDate).tz(userTimeZone);
  const [timeLeft, setTimeLeft] = useState<string>(
    updateTimer(userTimeZone, targetDate),
  );

  useEffect(() => {
    setTimeLeft(updateTimer(userTimeZone, targetDate));
    const interval = setInterval(() => {
      const timeString = updateTimer(userTimeZone, targetDate);
      if (timeString === TIMER_FINISHED) {
        clearInterval(interval);
      }
      setTimeLeft(timeString);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, userTimeZone]);

  return <div {...rest}>{timeLeft}</div>;
};

/**
 * Gets a renderable string in HH:MM:SS format counting down to the target date.
 * @param userTimeZone timeone string for comparing current time
 * @param targetDate date were counting down to
 * @returns string to render in HH:MM:SS format
 */
const updateTimer = (
  userTimeZone: string,
  targetDate: moment.Moment,
): string => {
  const now = moment.utc().tz(userTimeZone);
  const timeDifference = targetDate.diff(now);

  if (timeDifference < 0) {
    return TIMER_FINISHED;
  }

  const duration = moment.duration(timeDifference);
  const hours = String(duration.hours()).padStart(2, '0');
  const minutes = String(duration.minutes()).padStart(2, '0');
  const seconds = String(duration.seconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};
export default Countdown;
