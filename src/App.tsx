import { useState } from "react";

import Dashboard from "./sections/dashboard/Dashboard";
import TeamSelect from "./sections/teamSelect/TeamSelect";
import { MLBTeam } from "./models";

export function App() {
	const [team, setTeam] = useState<MLBTeam | null>(null);
	return team ? (
		<div className="GiantsPi">
			<Dashboard team={team} clearTeamSelection={() => setTeam(null)}>
				<div>test</div>
			</Dashboard>
		</div>
	) : (
		<TeamSelect onSelect={setTeam} />
	);
}
