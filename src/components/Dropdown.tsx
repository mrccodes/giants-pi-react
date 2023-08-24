import React, { useState } from 'react';

export type DropdownOption = {
    value: string; 
    label: string
}

interface DropdownProps {
  options: DropdownOption[];
  onSelect: (selectedOption: DropdownOption) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option: { value: string; label: string }) => {
    onSelect(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative max-w-md mx-auto">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer border text-base bg-slate-700 p-2 rounded shadow"
      >
        {selectedOption.label}
      </div>
      {isOpen && (
        <div 
            className="absolute z-10 mt-2 w-full border rounded shadow bg-slate-500 "
            style={{ height: '8em', overflowY: 'scroll' }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="text-base cursor-pointer p-2 hover:bg-gray-700"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



export default Dropdown;