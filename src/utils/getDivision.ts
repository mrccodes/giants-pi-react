const getDivisionName = (divisionId: number): string | undefined => {
  const id = divisionId.toString();
  return divisions[id];
};

const divisions: { [key: string]: string } = {
  '200': 'AL West',
  '201': 'AL East',
  '202': 'AL Central',
  '203': 'NL West',
  '204': 'NL East',
  '205': 'NL Central',
};

export default getDivisionName;
