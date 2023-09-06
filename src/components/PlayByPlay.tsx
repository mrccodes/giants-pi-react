import { PlayData } from 'mlb-api/live-feed';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';
import moment from 'moment';

interface PlayByPlayProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'data'> {
  data: PlayData[];
}

const PlayByPlay = ({ data }: PlayByPlayProps) => {
  const memoData = useMemo(() => data, [data]);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [lastFour, setLastFour] = useState<PlayData[]>(
    getLatFourPlayDescriptions(memoData),
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const newLastFour = getLatFourPlayDescriptions(memoData);
    if (!isEqual(newLastFour, lastFour)) {
      setLastFour(getLatFourPlayDescriptions(memoData));
    }
  }, [memoData, lastFour]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative flex-wrap w-full grid grid-columns-1 gap-2 pl-2"
      >
        {lastFour.map((play) => (
          <div key={play.result.description} className="flex flex-nowrap">
            <div className="w-16 text-xs text-slate-400 grow-0 shrink-0 pt-1">
              {moment.utc(play.playEndTime).tz(userTimeZone).format('h:mm:ss')}
            </div>
            <div>{play.result.description}</div>
          </div>
        ))}
      </div>
    </>
  );
};

const getLatFourPlayDescriptions = (plays: PlayData[]): PlayData[] => {
  const playDescriptions: PlayData[] = [];
  plays.forEach((p) => {
    if (p.result && p.result.description) {
      playDescriptions.push(p);
    }
  });

  return playDescriptions.slice(-4);
};

export default PlayByPlay;
