import React from 'react';
import { render, act } from '@testing-library/react';
import moment from 'moment-timezone';

import { Countdown } from '../../src/components';

jest.useFakeTimers();

describe('<Countdown />', () => {
  it('renders the Countdown correctly', () => {
    const targetDate = moment().add(1, 'hours');
    const { getByText } = render(<Countdown targetDate={targetDate} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByText(/59:59/i)).toBeInTheDocument();
  });

  it('should show "00:00:00" when time is up', () => {
    const targetDate = moment();
    const { getByText } = render(<Countdown targetDate={targetDate} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByText('00:00:00')).toBeInTheDocument();
  });

  it('shows LoadingSpinner when timeLeft is empty', () => {
    const { getByTestId } = render(<Countdown targetDate={moment()} />);

    expect(getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
