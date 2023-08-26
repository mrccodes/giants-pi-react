import { useEffect, useState } from "react";

import Button from "../../components/Button";
import { ErrorMessage } from "../../components";
import { STLComponent } from "../../components";
import { MLBTeam } from "../../models";

interface DashboardProps {
    children: React.ReactNode | React.ReactNode[];
    team: MLBTeam;
    clearTeamSelection: () => void;
}

const Dashboard = ({ team, clearTeamSelection }: DashboardProps) => {
    const [error, setError] = useState<string | null>(null);
    const logoPath = team.logo.logoPath;

    useEffect(() => {
        if (team.logo.logoPath === '') {
            setError('Error initializing app for selected team.')
        }

        () => setError(null);
    }, [team])


    return team.id === '137' ?  (
        <div>
            {logoPath && <STLComponent  cameraOptions={team.camera} logoOptions={team.logo} height={100} width={100} fileUrl={logoPath}/>}
            {error && <ErrorMessage message={error}/>}
        </div>
    ) : (
        <div className="max-w-screen-xl text-center mx-auto">
           <ErrorMessage message="Sorry, the dashboard for this team is still under development." />
           <Button variant="outline" customClasses="mt-4" label="Back" onClick={clearTeamSelection}/>
        </div>
    )
}

export default Dashboard;