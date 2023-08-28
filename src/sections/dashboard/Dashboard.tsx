import { useEffect, useState } from "react";

import { ErrorMessage, LiveGame, Widget } from "../../components";
import { MLBTeam } from "../../models";
import NextGameCountdown from "../nextGameCountdown/NextGameCountdown";
import { TopSection } from "./TopSection";
import { useTeamSchedule } from "../../hooks";

interface DashboardProps {
    team: MLBTeam;
}

const Dashboard = ({ team }: DashboardProps) => {
    const [error, setError] = useState<string | null>(null);
    const { liveGame, nextGame, loading, error: scheduleError } = useTeamSchedule(team);


    useEffect(() => {
        if (team.logo.logoPath === '') {
            setError('Error initializing app for selected team.')
        }

        () => setError(null);
    }, [team])


    return (
        <div>
            <TopSection team={team} />

           {!error && <section 
                id="main-content" 
                className="grid grid-cols-3 grid-rows-3 gap-4 px-6"
            >
                <Widget loading={loading}>
                    {
                        liveGame ? 
                            <LiveGame className="text-slate-100 text-size-5xl font-extrabold" game={liveGame} team={team} /> :
                            <NextGameCountdown 
                                className="text-slate-100 text-size-5xl font-extrabold" 
                                team={team}
                                nextGame={nextGame}
                                error={scheduleError}
                            />
                    }
                </Widget>
            </section>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default Dashboard;