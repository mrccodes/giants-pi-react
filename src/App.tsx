import { useState } from 'react';
import { Team } from 'mlb-api/teams';

import { Temp } from './components';
import { AppHeader, Dashboard, TeamSelect } from './sections';
import { DEBUG_MODE, PI_MODE, VITE_MODE } from './config';

console.log('Vite mode: ', VITE_MODE);

if (DEBUG_MODE !== 'true') {
  console.log(
    'Debug mode disabled. To enable, change `VITE_DEBUG` in `.env.[mode]` to `true`',
  );
} else {
  console.log(
    'Debug mode enabled. To disable, change `VITE_DEBUG` in `.env.[mode]` to `false`',
  );
}

if (PI_MODE !== 'true') {
  console.log(
    'Raspberry Pi features disabled. To enable, change `VITE_PI` in `.env.[mode]` to `true`',
  );
} else {
  console.log(
    'Raspberry Pi features enabled. To disable, change `VITE_PI` in `.env.[mode]` to `false`',
  );
}

export function App() {
  const [team, setTeam] = useState<Team | null>(null);

  return team ? (
    <div className="GiantsPi overflow-hidden">
      <Temp />
      {team && <AppHeader team={team} />}
      <Dashboard team={team} />
    </div>
  ) : (
    <>
      <Temp />
      <TeamSelect onSelect={setTeam} />
    </>
  );
}
