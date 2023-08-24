import { useState, useEffect } from "react";
import Dropdown, { DropdownOption } from "../../components/Dropdown";
import { mlbTeams } from "./mlbTeams";
import ErrorMessage from "../../components/ErrorMessage";

interface TeamSelectProps {
    setTeamId: React.Dispatch<React.SetStateAction<string | null>>;
}

const TeamSelect = ({ setTeamId }: TeamSelectProps) => {

    const onTeamSelect = (team: DropdownOption) => {
       setTeamId(team.value)
    }

    return (
        <div className="max-w-screen-xl mt-8 text-white text-center mx-auto" id="teamSelect">
            <h1 className="text-4xl mb-3 ">Welcome, select your team!</h1>
            <Dropdown onSelect={onTeamSelect} options={mlbTeams}></Dropdown>
        </div>
    )
}

export default TeamSelect;