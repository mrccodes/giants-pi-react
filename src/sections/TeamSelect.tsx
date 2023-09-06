import { useState, useEffect } from 'react';
import { Team } from 'mlb-api/teams';

import { Dropdown, ErrorMessage, LoadingSpinner } from '../components';
// import { MLBTeams } from '../data';
import { DropdownOption } from '../models';
import { getTeams } from '../services/mlbApi';

interface TeamSelectProps {
  onSelect:
    | React.Dispatch<React.SetStateAction<Team | null>>
    | ((val: Team | null) => void);
}

const TeamSelect = ({ onSelect }: TeamSelectProps) => {
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);
  const [teamsResponse, setTeamsResponse] = useState<Team[]>([]);
  const [error, setError] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const init = async () => {
      getTeams()
        .then((res) => {
          setTeamsResponse(res);
          setDropdownOptions(createMLBDropdownOptions(res));
        })
        .catch((err) => {
          setError(`Error fetching teams: ${err}`);
        });
    };
    init();
  }, []);

  const onTeamSelect = (option: DropdownOption) => {
    onSelect(findTeamById(option.value, teamsResponse));
  };

  if (error) {
    return (
      <div className="w-full h-full inset-0">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return dropdownOptions.length ? (
    <div
      className="max-w-screen-xl mt-8 text-white text-center mx-auto"
      id="teamSelect"
    >
      <h1 className="text-4xl mb-3 ">Welcome, select your team!</h1>
      <Dropdown
        dropdownButtonId="teamDropdown"
        onSelect={onTeamSelect}
        options={dropdownOptions}
      ></Dropdown>
    </div>
  ) : (
    <LoadingSpinner
      size="fullscreen"
      className="h-screen items-center w-screen "
    />
  );
};

const createMLBDropdownOptions = (teams: Team[]): DropdownOption[] =>
  teams.map(({ name, id }) => ({ label: name, value: id }));

const findTeamById = (id: string | number, teams: Team[]) =>
  teams.find((t) => t.id === id) ?? null;

export default TeamSelect;
