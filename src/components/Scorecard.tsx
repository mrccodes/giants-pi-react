import React from 'react';

interface ScorecardProps extends React.HTMLProps<HTMLDivElement> {
  selectedTeamName: string;
  opposingTeamName: string;
  selectedTeamScore: number;
  opposingTeamScore: number;
}

const Scorecard = ({
  selectedTeamName,
  opposingTeamName,
  selectedTeamScore,
  opposingTeamScore,
  className,
  ...rest
}: ScorecardProps) => {
  return (
    <div
      {...rest}
      className={
        'flex justify-center gap-2 text-center content-center flex-wrap ' +
        className
      }
    >
      <p className="text-sm self-center">{selectedTeamName}</p>
      <div className="flex text-3xl gap-2 self-center">
        <span>{selectedTeamScore}</span>
        <span>-</span>
        <span>{opposingTeamScore}</span>
      </div>
      <p className="text-sm self-center">{opposingTeamName}</p>
    </div>
  );
};

export default Scorecard;
