const abbreviateTeam = (name: string): string => {
  return teamMap[name];
};

const teamMap: { [key: string]: string } = {
  'San Francisco Giants': 'SF',
  'Cincinnati Reds': 'CIN',
  'New York Yankees': 'NYY',
  'Boston Red Sox': 'BOS',
  'Los Angeles Dodgers': 'LAD',
  'Chicago Cubs': 'CHC',
  'Atlanta Braves': 'ATL',
  'Houston Astros': 'HOU',
  'Oakland Athletics': 'OAK',
  'Minnesota Twins': 'MIN',
  'Detroit Tigers': 'DET',
  'Chicago White Sox': 'CWS',
  'St. Louis Cardinals': 'STL',
  'Philadelphia Phillies': 'PHI',
  'Tampa Bay Rays': 'TB',
  'Cleveland Guardians': 'CLE',
  'Milwaukee Brewers': 'MIL',
  'New York Mets': 'NYM',
  'Toronto Blue Jays': 'TOR',
  'Kansas City Royals': 'KC',
  'Texas Rangers': 'TEX',
  'San Diego Padres': 'SD',
  'Colorado Rockies': 'COL',
  'Arizona Diamondbacks': 'ARI',
  'Seattle Mariners': 'SEA',
  'Miami Marlins': 'MIA',
  'Los Angeles Angels': 'LAA',
  'Baltimore Orioles': 'BAL',
  'Washington Nationals': 'WSH',
  'Pittsburgh Pirates': 'PIT',
};

export default abbreviateTeam;
