import React, { useState } from 'react';

import { DropdownOption } from '../models';

interface DropdownProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'onSelect'> {
  onSelect: (selectedOption: DropdownOption) => void;
  hideDefaultOption?: boolean;
  options: DropdownOption[];
  dropdownButtonId?: string;
  dropdownButtonClass?: string;
  dropdownOptionClass?: string;
}

/**
 * Dropdown Component
 *
 * Custom dropdown used for teamselect. It could probably be way simplified and improved.
 */
const Dropdown = ({
  options,
  onSelect,
  hideDefaultOption = false,
  className,
  dropdownButtonClass,
  dropdownButtonId,
  dropdownOptionClass,
  ...rest
}: DropdownProps) => {
  const defaultValue: DropdownOption = hideDefaultOption
    ? options[0]
    : { value: 'select', label: 'Select Team' };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<DropdownOption>(defaultValue);

  const handleSelect = (option: { value: number | string; label: string }) => {
    onSelect(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div {...rest} className={`relative max-w-md mx-auto ${className ?? ''}`}>
      <div
        {...(dropdownButtonId ? { id: dropdownButtonId } : {})}
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer border text-base bg-slate-700 p-2 rounded shadow ${
          dropdownButtonClass ?? ''
        }`}
      >
        {selectedOption.label}
      </div>
      {isOpen && (
        <div
          className="absolute z-10 mt-2 w-full border rounded shadow bg-slate-500 "
          style={{ height: 'auto', overflowY: 'scroll' }}
        >
          {!hideDefaultOption ?? (
            <div
              key={'select'}
              className="text-base cursor-pointer p-2 hover:bg-gray-700"
            >
              Select Team
            </div>
          )}
          {options.map((option, index) => (
            <div
              key={index}
              id={
                typeof option.value === 'number'
                  ? option.value.toString()
                  : option.value
              }
              onClick={() => handleSelect(option)}
              className={`text-base cursor-pointer p-2 hover:bg-gray-700 ${
                dropdownOptionClass ?? ''
              }`}
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
