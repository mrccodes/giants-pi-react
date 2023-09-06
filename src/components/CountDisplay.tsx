import { Count } from 'mlb-api/live-feed';
import { HTMLProps } from 'react';

interface CountDisplayProps extends HTMLProps<HTMLDivElement> {
  count: Count;
}

/**
 * CountDisplay Component
 *
 * Renders balls/strikes/outs
 *
 * @example
 * B: 3
 * S: 2
 * O: 2
 */
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
