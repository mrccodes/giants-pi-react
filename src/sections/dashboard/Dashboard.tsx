import { useEffect, useState } from "react";
import { ErrorMessage, Widget } from "../../components";
import { MLBTeam } from "../../models";
import NextGameCountdown from "../nextGameCountdown/NextGameCountdown";
import { TopSection } from "./TopSection";

interface DashboardProps {
    team: MLBTeam;
}

const Dashboard = ({ team }: DashboardProps) => {
    const [error, setError] = useState<string | null>(null);

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
                className="grid grid-cols-3 grid-rows-4 gap-4 px-6"
            >
                <Widget>
                    <NextGameCountdown className="text-slate-100 text-size-5xl font-extrabold" team={team}/>
                </Widget>
            </section>}

            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default Dashboard;