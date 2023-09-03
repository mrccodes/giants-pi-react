import { Person } from 'mlb-api';
import { HTMLProps } from 'react';

interface MenOnBaseProps extends HTMLProps<HTMLDivElement> {
  first?: Person;
  second?: Person;
  third?: Person;
  customActiveClass?: string;
}

const MenOnBase = ({
  first,
  second,
  third,
  className,
  customActiveClass,
  ...rest
}: MenOnBaseProps) => {
  const baseClass = 'w-6 h-6 border-2 border-slate-100';
  const activeBaseClass =
    customActiveClass ?? 'bg-yellow-400 border-yellow-400';
  const wrapperClass = `relative w-16 h-16 ${className ? className : ''}`;

  return (
    <div {...rest} className={wrapperClass}>
      <div
        className={`${baseClass} absolute top-1/2 right-0 transform rotate-45 -translate-y-1/2  ${
          first ? activeBaseClass : ''
        }`}
      ></div>
      <div
        className={`${baseClass} absolute top-0 left-1/2 transform rotate-45 -translate-x-1/2 ${
          second ? activeBaseClass : ''
        }`}
      ></div>
      <div
        className={`${baseClass} absolute top-1/2 left-0 transform rotate-45 -translate-y-1/2 ${
          third ? activeBaseClass : ''
        }`}
      ></div>
    </div>
  );
};

export default MenOnBase;
