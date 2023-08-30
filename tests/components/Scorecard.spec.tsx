import { expect } from 'vitest';
import { render } from '@testing-library/react';

import { Scorecard } from '../../src/components';

test('renders team names and scores', () => {
  const props = {
    selectedTeamName: 'Team A',
    opposingTeamName: 'Team B',
    selectedTeamScore: 10,
    opposingTeamScore: 20,
  };

  const { getByText } = render(<Scorecard {...props} />);

  expect(getByText(/Team A/i)).toBeInTheDocument();
  expect(getByText(/Team B/i)).toBeInTheDocument();
  expect(getByText(/20/i)).toBeInTheDocument();
  expect(getByText(/10/i)).toBeInTheDocument();
});
