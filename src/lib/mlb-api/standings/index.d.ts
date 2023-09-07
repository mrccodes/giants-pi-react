declare module 'mlb-api/standings' {
  import type {
    BaseData,
    LinkAndID,
    RecordBase,
    RecordWithTies,
  } from 'mlb-api';

  interface DivisionRecord extends RecordBase {
    division: BaseData;
  }
  interface LeagueRecord extends RecordBase {
    league: BaseData;
  }
  interface BasicRecord extends RecordBase {
    type: string;
  }
  type OverallRecord = BasicRecord;
  type ExpectedRecord = BasicRecord;
  type SplitRecord = BasicRecord;

  interface RecordData {
    clinched: boolean;
    conferenceGamesBack: string;
    divisionChamp: boolean;
    divisionGamesBack: string;
    divisionLeader: boolean;
    divisionRank: string;
    eliminationNumber: string;
    eliminationNumberConference: string;
    eliminationNumberDivision: string;
    eliminationNumberLeague: string;
    eliminationNumberSport: string;
    gamesBack: string;
    gamesPlayed: number;
    hasWildcard: boolean;
    lastUpdated: string;
    leagueGamesBack: string;
    leagueRank: string;
    leagueRecord: RecordWithTies;
    losses: number;
    magicNumber: string;
    records: {
      divisionRecords: DivisionRecord[];
      expectedRecords: ExpectedRecord[];
      leagueRecords: LeagueRecord[];
      overallRecords: OverallRecord[];
      splitRecords: SplitRecord[];
    };
    runDifferential: number;
    runsAllowed: number;
    runsScored: number;
    season: string;
    sportGamesBack: string;
    sportRank: string;
    springLeagueGamesBack: string;
    streak: {
      streakCode: string;
      streakNumber: number;
      streakType: string;
    };
    team: BaseData;
    wildCardEliminationNumber: string;
    wildCardGamesBack: string;
    winningPercentage: string;
    wins: number;
  }

  interface Record {
    division: LinkAndID;
    lastUpdated: string;
    league: LinkAndID;
    sport: LinkAndID;
    standingType: string;
    teamRecords: RecordData[];
  }

  interface Standings {
    copyright: string;
    records: Record[];
  }
}
