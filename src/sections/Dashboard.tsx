import { PropsWithChildren } from 'react';
import { Team } from 'mlb-api/teams';

import { LiveGame } from '../components';
import {
  NextGameCountdown,
  LiveFeed,
  CurrentSeries,
  PreviousSeries,
  TeamStats,
  LeagueStandings,
} from '.';
import { useTeamSchedule } from '../hooks';
import { useTeamStandings } from '../hooks/useTeamStandings';

interface DashboardProps {
  team: Team;
}

const Dashboard = ({ team }: DashboardProps) => {
  const {
    liveGame,
    nextGame,
    schedule,
    loading: scheduleLoading,
    error: scheduleError,
  } = useTeamSchedule(team);
  const {
    standings,
    error: standingsError,
    loading: standingsLoading,
  } = useTeamStandings(team, liveGame);

  return (
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
          loading={scheduleLoading}
          schedule={schedule}
          team={team}
          error={scheduleError}
          nextGame={nextGame}
          liveGame={liveGame}
        />
        {!liveGame && (
          <PreviousSeries
            loading={scheduleLoading}
            schedule={schedule}
            team={team}
            error={scheduleError}
            nextGame={nextGame}
            liveGame={liveGame}
          />
        )}
        <TeamStats
          standings={standings}
          loading={standingsLoading}
          error={standingsError}
          team={team}
        />
        <LeagueStandings
          team={team}
          standings={standings}
          loading={standingsLoading}
          error={standingsError}
        />
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

export default Dashboard;
