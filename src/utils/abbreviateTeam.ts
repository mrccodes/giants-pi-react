const abbreviateTeam = (name: string): string => {
  return name
    .split(' ')
    .map((c) => c[0])
    .join('');
};

export default abbreviateTeam;
