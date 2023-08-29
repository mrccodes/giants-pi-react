import { expect } from 'vitest';
import { render, act } from '@testing-library/react';
import moment from 'moment-timezone';

import Countdown from '../../src/components/Countdown';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test('<Countdown /> renders the Countdown correctly', async () => {
  const targetDate = moment().add(1, 'hours');
  const { getByText } = render(<Countdown targetDate={targetDate} />);

  await act(async () => {
    await sleep(700);
  });

  expect(getByText(/59:59/i)).toBeInTheDocument();
});

test('should show "00:00:00" when time is up', async () => {
  const targetDate = moment();
  const { getByText } = render(<Countdown targetDate={targetDate} />);

  await act(async () => {
    await sleep(1000);
  });

  expect(getByText('00:00:00')).toBeInTheDocument();
});
