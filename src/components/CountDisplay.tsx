import { Count } from 'mlb-api';
import { HTMLProps } from 'react';

interface CountDisplayProps extends HTMLProps<HTMLDivElement> {
  count: Count;
}

const CountDisplay = ({ count, ...rest }: CountDisplayProps) => {
  return (
    <div {...rest}>
      <div>B: {count.balls ?? 0}</div>
      <div>S: {count.strikes ?? 0}</div>
      <div>O: {count.outs ?? 0}</div>
    </div>
  );
};

export default CountDisplay;
