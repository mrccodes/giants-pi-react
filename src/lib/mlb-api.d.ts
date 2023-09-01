declare module 'mlb-api' {
  export interface GameStatus {
    abstractGameCode: string;
    abstractGameState: string;
    codedGameState: string;
    detailedState: string;
    startTimeTBD: boolean;
    statusCode: string;
  }
  export interface Team {
    isWinner: boolean;
    leagueRecord: {
      wins: number;
      losses: number;
      pct: string;
    };
    score: number;
    seriesNumber: number;
    splitSquad: boolean;
    team: {
      id: number;
      link: string;
      name: string;
    };
  }
  export interface Game {
    calendarEventId: string;
    content: { link: string };
    dayNight: 'day' | 'night';
    doubleHeader: 'Y' | 'N';
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
    tiebreaker: 'Y' | 'N';
    venue: {
      id: number;
      link: string;
      name: string;
    };
  }
  export interface GameDate {
    date: string;
    events: unknown[];
    games: Game[];
    totalEvents: number;
    totalGames: number;
    totalGamesInProgress: number;
    totalItems: number;
  }
  interface CompletedGameStatus extends GameStatus {
    abstractGameState: 'Final';
  }
  export interface CompletedGame extends Game {
    status: CompletedGameStatus;
  }
}
