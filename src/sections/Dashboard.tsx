import { PropsWithChildren } from 'react';
import { Team } from 'mlb-api/teams';

import { ErrorMessage, LiveGame, LoadingSpinner } from '../components';
import {
  NextGameCountdown,
  LiveFeed,
  CurrentSeries,
  PreviousSeries,
  TeamStats,
} from '.';
import { useTeamSchedule } from '../hooks';

interface DashboardProps {
  team: Team;
}

const Dashboard = ({ team }: DashboardProps) => {
  const { liveGame, nextGame, schedule, loading, error } =
    useTeamSchedule(team);

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
    <ErrorMessage message={error ?? 'Unknown error.'} />
  ) : (
    <div className="px-6">
      {liveGame && (
        <LiveFeed
          className="w-full mb-3"
          team={team}
          gamePk={liveGame.gamePk.toString()}
        />
      )}

      <Wrapper>
        {liveGame ? (
          <LiveGame game={liveGame} team={team} />
        ) : (
          <NextGameCountdown team={team} nextGame={nextGame} />
        )}
        <CurrentSeries
          loading={!(schedule && nextGame && !loading)}
          schedule={schedule}
          team={team}
          nextGame={nextGame}
          liveGame={liveGame}
        />
        <PreviousSeries
          loading={!(schedule && nextGame && !loading)}
          schedule={schedule}
          team={team}
          nextGame={nextGame}
          liveGame={liveGame}
        />
        <TeamStats team={team} />
      </Wrapper>
    </div>
  );
};

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <section
        id="main-content"
        className="grid lg:grid-cols-3 lg:grid-rows-3 md:grid-cols-1 lg:grid-rows-auto gap-4"
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
