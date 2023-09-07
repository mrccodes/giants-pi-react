declare module 'mlb-api/teams' {
  import { BaseData, YN } from 'mlb-api';
  interface Team extends BaseData {
    abbreviation: string;
    active: boolean;
    allStarStatus: YN;
    clubName: string;
    division: BaseData;
    fileCode: string;
    firstYearOfPlay: string;
    franchiseName: string;
    league: BaseData;
    locationName: string;
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
