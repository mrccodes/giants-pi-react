import { HTMLProps, useEffect, useState } from 'react';

import { getBoxscore } from '../services/mlbApi';
import LoadingSpinner from './LoadingSpinner';
import Widget from './Widget';

interface BoxscoreProps extends HTMLProps<HTMLDivElement> {
  gamePk: string;
}

const Boxscore = ({ gamePk, ...rest }: BoxscoreProps) => {
  const [boxscore, setBoxscore] = useState<object | undefined>(undefined);

  useEffect(() => {
    const init = async () => {
      const bs = await getBoxscore(gamePk);
      setBoxscore(bs);
    };
    init();
  }, [gamePk]);

  return boxscore ? (
    <Widget className="overflow-hidden">{JSON.stringify(boxscore)}</Widget>
  ) : (
    <Widget {...rest}>
      <LoadingSpinner variant="linear" />
    </Widget>
  );
};

export default Boxscore;
