import { useEffect, useState, PropsWithChildren } from 'react';

import { ErrorMessage, LiveGame, LoadingSpinner } from '../components';
import { MLBTeam } from '../models';
import NextGameCountdown from './NextGameCountdown';
import { CurrentSeries, PreviousSeries } from './index';
import { useTeamSchedule } from '../hooks';
import Boxscore from '../components/Boxscore';

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
    // mostRecentGame,
    error: scheduleError,
  } = useTeamSchedule(team);

  useEffect(() => {
    if (team.logo.logoPath === '') {
      setError('Error initializing app for selected team.');
    }

    () => setError(null);
  }, [team]);

  if (loading) {
    return (
      <Wrapper>
        <CardLoader />
        <CardLoader />
        <CardLoader />
      </Wrapper>
    );
  }

  return error ? (
    <ErrorMessage message={error} />
  ) : (
    <Wrapper>
      <>
        {nextGame && <Boxscore gamePk={nextGame.gamePk.toString()} />}
        {liveGame ? (
          <LiveGame game={liveGame} team={team} />
        ) : (
          <NextGameCountdown
            team={team}
            nextGame={nextGame}
            error={scheduleError}
          />
        )}
        <CurrentSeries
          schedule={schedule}
          team={team}
          nextGame={nextGame}
          liveGame={liveGame}
        />
        <PreviousSeries
          schedule={schedule}
          team={team}
          nextGame={nextGame}
          liveGame={liveGame}
        />
      </>
    </Wrapper>
  );
};

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <section
        id="main-content"
        className="grid lg:grid-cols-3 lg:grid-rows-3 md:grid-cols-1 lg:grid-rows-auto gap-4 px-6"
      >
        {children}
      </section>
    </div>
  );
};

const CardLoader = () => {
  return (
    <div className="w-full h-36 rounded flex justify-center content-center border border-slate-100">
      <LoadingSpinner className="flex items-center h-full" variant="linear" />
    </div>
  );
};

export default Dashboard;
