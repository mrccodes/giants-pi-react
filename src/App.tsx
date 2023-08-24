import { useState } from "react";
import Dashboard from "./sections/dashboard/Dashboard";
import TeamSelect from "./sections/teamSelect/TeamSelect";

export function App() {
	const [teamId, setTeamId] = useState<string | null>(null);
	return teamId ? (
		<div className="GiantsPi">
			<Dashboard teamId={teamId} clearTeamSelection={() => setTeamId(null)}>
				<div>test</div>
			</Dashboard>
		</div>
	) : (
		<TeamSelect setTeamId={setTeamId} />
	);
}
