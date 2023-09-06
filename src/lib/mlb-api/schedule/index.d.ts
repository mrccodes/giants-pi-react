declare module 'mlb-api/schedule' {
  import type { DayNight, YN, BaseData } from 'mlb-api';
  interface GameDate {
    date: string;
    events: unknown[];
    games: Game[];
    totalEvents: number;
    totalGames: number;
    totalGamesInProgress: number;
    totalItems: number;
  }
  interface Game {
    calendarEventId: string;
    content: { link: string };
    dayNight: DayNight;
    doubleHeader: YN;
    gameDate: string;
    gameGuid: string;
    gameNumber: number;
    gamePk: number;
    gameType: string;
    gamedayType: string;
    gamesInSeries: number;
    ifNecessary: string;
    ifNecessaryDescription: string;
    inningBreakLength: number;
    isTie: boolean;
    link: string;
    officialDate: string;
    publicFacing: boolean;
    recordSource: string;
    reverseHomeAwayStatus: boolean;
    scehduledInnings: number;
    season: string;
    seasonDisplay: string;
    seriesDescription: string;
    seriesGameNumber: number;
    status: GameStatus;
    teams: { away: Team; home: Team };
    tiebreaker: YN;
    venue: BaseData;
  }
  interface GameStatus {
    abstractGameCode: string;
    abstractGameState: string;
    codedGameState: string;
    detailedState: string;
    startTimeTBD: boolean;
    statusCode: string;
  }
  interface Team {
    isWinner: boolean;
    leagueRecord: Record;
    score: number;
    seriesNumber: number;
    splitSquad: boolean;
    team: BaseData;
  }
  interface CompletedGameStatus extends GameStatus {
    abstractGameState: 'Final';
  }
  interface CompletedGame extends Game {
    status: CompletedGameStatus;
  }
}
