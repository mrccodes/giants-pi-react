import { useState, useEffect } from 'react';
import { Team } from 'mlb-api/teams';
import { useSearchParams } from 'react-router-dom';

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

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (teamsResponse.length === 0) return;
    const teamId = searchParams.get('teamId');
    if (!teamId) {
      return;
    }
    const teamIdNum = Number(teamId);
    if (Number.isNaN(teamIdNum)) {
      console.error('Invalid param passed for teamId: teamId must be a number');
      return;
    }

    const selected = teamsResponse.find((team) => team.id === teamIdNum);

    if (!selected) {
      console.error(
        'Invalid param passed for teamId: teamId does not correspond to any teams',
      );
      return;
    }

    onSelect(selected);
  }, [teamsResponse, onSelect, searchParams]);

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
