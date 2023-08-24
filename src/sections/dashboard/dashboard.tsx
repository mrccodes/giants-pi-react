import { useEffect, useState } from "react";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import STLComponent from "../../components/STLComponent";
import { teamLogos } from "../../data/teamLogos";

interface DashboardProps {
    children: React.ReactNode | React.ReactNode[];
    teamId: string;
    clearTeamSelection: () => void;
}

const Dashboard = ({ children, teamId, clearTeamSelection }: DashboardProps) => {
    const [logoPath, setLogoPath] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const team = teamLogos.find(team => team.teamId === teamId);
        team ? setLogoPath('/src/assets/teamLogos/' + team.filename) : setError('No logo exists for team.')
    }, [])
    return teamId === '137' ?  (
        <div>
            {logoPath && <STLComponent height={100} width={100} fileUrl={logoPath}/>}
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