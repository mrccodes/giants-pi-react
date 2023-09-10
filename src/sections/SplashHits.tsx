import React from 'react';
import { LiveFeedData } from 'mlb-api/live-feed';
import moment from 'moment';

import { useSplashHits } from '../hooks';
import { ErrorMessage, Widget } from '../components';

interface SplashHitsProps extends React.HTMLProps<HTMLDivElement> {
  liveFeedData?: LiveFeedData;
}

const SplashHits = ({ liveFeedData }: SplashHitsProps) => {
  const { list, total, error, loading } = useSplashHits(liveFeedData);

  if (error)
    return (
      <Widget>
        <ErrorMessage message={error} />
      </Widget>
    );

  return (
    <Widget loading={loading}>
      <p className="text-2xl font-bold text-center">Splash Hits 💦</p>
      {total && (
        <p className="text-5xl font-semibold py-2 text-center">{total}</p>
      )}
      {list && (
        <div>
          <p className="text-md p-0 text-center">Most Recent</p>
          <div className="px-3 py-2 border border-slate-300 rounded">
            {list.slice(0, 3).map((hit, idx) => (
              <div
                key={`${hit.batter.firstName}-${hit.batter.lastName}-${hit.date}-${hit.pitcher.lastName}`}
                className={`${
                  idx !== 2 ? 'border-b border-slate-600' : ''
                } items-center w-full text-xl font-semibold text-center inline-flex justify-between`}
              >
                <span className="text-sm">{hit.number}</span>
                <span>
                  {hit.batter.firstName} {hit.batter.lastName}
                </span>
                <span>{moment(hit.date).format('MM/DD/YYYY')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Widget>
  );
};

export default SplashHits;
