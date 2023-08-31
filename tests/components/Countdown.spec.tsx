import { describe, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import moment from 'moment-timezone';

import Countdown from '../../src/components/Countdown';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('<Countdown /> renders the Countdown correctly', () => {
  test('for targetDate less than 1 minute', async () => {
    const targetDate = moment().add(1, 'minute');
    const { getByText } = render(<Countdown targetDate={targetDate} />);

    await act(async () => {
      await sleep(100);
    });

    expect(getByText(/00:00:59/i)).toBeInTheDocument();
  });

  test('for targetDate less than 1 hour', async () => {
    const targetDate = moment().add(1, 'hours');
    const { getByText } = render(<Countdown targetDate={targetDate} />);

    await act(async () => {
      await sleep(100);
    });

    expect(getByText(/00:59:59/i)).toBeInTheDocument();
  });

  test('for targetDate less than 1 day', async () => {
    const targetDate = moment().add(2, 'hours');
    const { getByText } = render(<Countdown targetDate={targetDate} />);

    await act(async () => {
      await sleep(100);
    });

    expect(getByText(/01:59:59/i)).toBeInTheDocument();
  });

  test('for targetDate more than 1 day', async () => {
    const targetDate = moment().add(2, 'hours').add(5, 'days');
    const { getByText } = render(<Countdown targetDate={targetDate} />);

    await act(async () => {
      await sleep(800);
    });

    expect(getByText(/121:59:59/i)).toBeInTheDocument();
  });

  test('should show "00:00:00" when time is up', async () => {
    const targetDate = moment().add(950, 'ms');
    const { getByText } = render(<Countdown targetDate={targetDate} />);

    await act(async () => {
      await sleep(1000);
    });

    expect(getByText('00:00:00')).toBeInTheDocument();
  });
});
