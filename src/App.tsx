import { useState } from 'react';
import { Team } from 'mlb-api/teams';

import { Temp } from './components';
import { AppHeader, Dashboard, TeamSelect } from './sections';
import { DEBUG_MODE, PI_MODE } from './config';

if (DEBUG_MODE !== 'true') {
  console.log(
    'Debug mode disabled. To enable, start the app with VITE_DEBUG=true or use npm run start:debug',
  );
}

if (PI_MODE !== 'true') {
  console.log(
    'Raspberry Pi features disabled. To enable, start the app with VITE_PI=true or use npm run start:bash',
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
