declare module 'mlb-api/teams' {
  import { BaseData, YN } from 'mlb-api';
  interface Team {
    abbreviation: string;
    active: boolean;
    allStarStatus: YN;
    clubName: string;
    division: BaseData;
    fileCode: string;
    firstYearOfPlay: string;
    franchiseName: string;
    id: number;
    league: BaseData;
    link: string;
    locationName: string;
    name: string;
    parentOrgId: number;
    parentOrgName: string;
    season: number;
    shortName: string;
    sport: BaseData;
    teamCode: string;
    teamName: string;
    venue: BaseData;
  }
}
