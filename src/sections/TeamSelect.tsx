import { useState, useEffect } from 'react';

import { Dropdown, LoadingSpinner } from '../components';
import { MLBTeams } from '../data';
import { DropdownOption, MLBTeam } from '../models';

interface TeamSelectProps {
  onSelect:
    | React.Dispatch<React.SetStateAction<MLBTeam | null>>
    | ((val: MLBTeam | null) => void);
}

const TeamSelect = ({ onSelect }: TeamSelectProps) => {
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);

  useEffect(() => {
    const options = createMLBDropdownOptions(MLBTeams);
    setDropdownOptions(options);
  }, []);

  const onTeamSelect = (option: DropdownOption) => {
    const selected = findTeamById(option.value, MLBTeams);
    onSelect(selected);
  };

  return dropdownOptions.length ? (
    <div
      className="max-w-screen-xl mt-8 text-white text-center mx-auto"
      id="teamSelect"
    >
      <h1 className="text-4xl mb-3 ">Welcome, select your team!</h1>
      <Dropdown onSelect={onTeamSelect} options={dropdownOptions}></Dropdown>
    </div>
  ) : (
    <LoadingSpinner
      size="fullscreen"
      className="h-screen items-center w-screen "
    />
  );
};

const createMLBDropdownOptions = (teams: MLBTeam[]): DropdownOption[] =>
  teams.map(({ name, id }) => ({ label: name, value: id }));

const findTeamById = (id: string, teams: MLBTeam[]) =>
  teams.find((t) => t.id === id) ?? null;

export default TeamSelect;
