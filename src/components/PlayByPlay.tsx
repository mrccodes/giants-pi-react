import { PlayData } from 'mlb-api/live-feed';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';

interface PlayByPlayProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'data'> {
  data: PlayData[];
}

const PlayByPlay = ({ data }: PlayByPlayProps) => {
  const memoData = useMemo(() => data, [data]);
  const [lastFour, setLastFour] = useState(
    getLatFourPlayDescriptions(memoData),
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const newLastFour = getLatFourPlayDescriptions(memoData);
    if (!isEqual(newLastFour, lastFour)) {
      const container = containerRef.current;
      container.style.transition = 'none';
      container.style.transform = 'translateY(-100%)';
      setLastFour(getLatFourPlayDescriptions(memoData));
      console.log('not equal', { lastFour }, { newLastFour });
      setTimeout(() => {
        container.style.transition = 'transform 0.3s ease-in-out';
        container.style.transform = 'translateY(0)';
      }, 50);
    }
  }, [memoData, lastFour]);

  return (
    <div className="relative flex-wrap w-full grid grid-columns-1 gap-2 overflow-hidden">
      <div ref={containerRef} className="transition-container">
        {lastFour.map((play) => (
          <div key={play} className="single-play">
            {play}
          </div>
        ))}
      </div>
    </div>
  );
};

const getLatFourPlayDescriptions = (plays: PlayData[]): string[] => {
  const playDescriptions: string[] = [];
  plays.forEach((p) => {
    if (p.result && p.result.description) {
      playDescriptions.push(p.result.description);
    }
  });

  return playDescriptions.slice(-4);
};

export default PlayByPlay;
