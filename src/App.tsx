import { useEffect, useState } from "react";

import { ErrorMessage } from "./components";
import { Dashboard, TeamSelect } from "./sections";
import { MLBTeam } from "./models";

export function App() {
	const [team, setTeam] = useState<MLBTeam | null>(null);
	const [error, setError] = useState<string | null>(null);

    useEffect(() => {
		if (!team) return;

        if (team.logo.logoPath === '') {
            setError('Error initializing app for selected team.')
        }

        () => setError(null);
    }, [team])

	if (error) {
		return (
			<div className="GiantsPi overflow-hidden">
				<ErrorMessage message={error}/>
			</div>
		)
	}

	return team ? (
		<div className="GiantsPi overflow-hidden">
			<Dashboard team={team} />
		</div>
	) : (
		<TeamSelect onSelect={setTeam} />
	);
}
