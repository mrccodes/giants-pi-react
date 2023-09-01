import { useEffect, useState } from 'react';

import { ErrorMessage, LiveGame, Widget } from '../components';
import { MLBTeam } from '../models';
import NextGameCountdown from './NextGameCountdown';
import { CurrentSeries, PreviousSeries } from './index';
import { useTeamSchedule } from '../hooks';

interface DashboardProps {
  team: MLBTeam;
}

const Dashboard = ({ team }: DashboardProps) => {
  const [error, setError] = useState<string | null>(null);
  const {
    liveGame,
    nextGame,
    schedule,
    loading,
    error: scheduleError,
  } = useTeamSchedule(team);

  useEffect(() => {
    if (team.logo.logoPath === '') {
      setError('Error initializing app for selected team.');
    }

    () => setError(null);
  }, [team]);

  return (
    <div>
      {!error && (
        <section
          id="main-content"
          className="grid grid-cols-3 grid-rows-3 gap-4 px-6"
        >
          <Widget loading={loading}>
            {liveGame ? (
              <LiveGame
                className="font-extrabold"
                game={liveGame}
                team={team}
              />
            ) : (
              <NextGameCountdown
                className="font-extrabold"
                team={team}
                nextGame={nextGame}
                error={scheduleError}
              />
            )}
          </Widget>
          <Widget>
            <CurrentSeries
              schedule={schedule}
              team={team}
              nextGame={nextGame}
              liveGame={liveGame}
            />
          </Widget>
          <Widget>
            <PreviousSeries
              schedule={schedule}
              team={team}
              nextGame={nextGame}
              liveGame={liveGame}
            />
          </Widget>
        </section>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default Dashboard;
