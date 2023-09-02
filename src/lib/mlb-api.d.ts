declare module 'mlb-api' {
  type YN = 'Y' | 'N';
  type YesNo = 'yes' | 'no';
  type DayNight = 'day' | 'night';
  type AMPM = 'AM' | 'PM';
  interface BasicStatus {
    description: string;
    code: string;
  }
  interface LabelValue {
    label: string;
    value: string;
  }
  interface BaseData {
    id: number;
    name: string;
    link: string;
  }
  interface Record {
    wins: number;
    losses: number;
    pct: string;
  }
  interface Position {
    abbreviation: string;
    code: string;
    name: string;
    type: string;
  }
  interface RecordWithTies extends LeagueRecord {
    ties: number;
  }
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
    leagueRecord: Record;
    score: number;
    seriesNumber: number;
    splitSquad: boolean;
    team: BaseData;
  }
  export interface Game {
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

  interface SpringLeague extends BaseData {
    abbreviation: string;
  }

  export interface SeasonStats {
    batting: {
      atBats: number;
      atBatsPerHomeRun: string;
      avg: string;
      babip: string;
      baseOnBalls: number;
      catchersInterference: number;
      caughtStealing: number;
      doubles: number;
      flyOuts: number;
      gamesPlayed: number;
      groundIntoDoublePlay: number;
      groundIntoTriplePlay: number;
      groundOuts: number;
      hitByPitch: number;
      hits: number;
      homeRuns: number;
      intentionalWalks: number;
      leftOnBase: number;
      obp: string;
      ops: string;
      pickoffs: number;
      plateAppearances: number;
      rbi: number;
      runs: number;
      sacBunts: number;
      sacFlies: number;
      slg: string;
      stolenBasePercentage: string;
      stolenBases: number;
      strikeOuts: number;
      totalBases: number;
      triples: number;
    };
    fielding: {
      assists: number;
      caughtStealing: number;
      chances: number;
      errors: number;
      fielding: string;
      passedBall: number;
      pickoffs: number;
      putOuts: number;
      stolenBasePercentage: string;
      stolenBases: string;
    };
    pitching: {
      airOuts: number;
      atBats: number;
      balks: number;
      balls: number;
      baseOnBalls: number;
      battersFaced: number;
      blownSaves: number;
      catchersInterference: number;
      caughtStealing: number;
      completeGames: number;
      doubles: number;
      earnedRuns: number;
      era: string;
      gamesFinished: number;
      gamesPitched: number;
      gamesPlayed: number;
      gamesStarted: number;
      groundOuts: number;
      groundOutsToAirouts: string;
      hitBatsmen: number;
      hitByPitch: number;
      hits: number;
      hitsPer9Inn: string;
      holds: number;
      homeRuns: number;
      homeRunsPer9: string;
      inheritedRunners: number;
      inheritedRunnersScored: number;
      inningsPitched: string;
      intentionalWalks: number;
      losses: number;
      numberOfPitches: number;
      obp: string;
      outs: number;
      passedBall: number;
      pickoffs: number;
      pitchesPerInning: string;
      rbi: number;
      runs: number;
      runsScoredPer9: string;
      sacBunts: number;
      sacFlies: number;
      saveOpportunities: number;
      saves: number;
      shutouts: number;
      stolenBasePercentage: string;
      stolenBases: number;
      strikeOuts: number;
      strikePercentage: string;
      strikeoutWalkRatio: string;
      strikeoutsPer9Inn: string;
      strikes: number;
      triples: number;
      walksPer9Inn: string;
      whip: string;
      wildPitches: number;
      winPercentage: string;
      wins: number;
    };
  }

  interface TeamFullData {
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
    record: {
      conferenceGamesBack: string;
      divisionGamesBack: string;
      divisionLeader: boolean;
      gamesPlayed: number;
      leagueGamesBack: string;
      leagueRecord: RecordWithTies;
      losses: number;
      records: object;
      sportGamesBack: string;
      springLeaguesGamesBack: string;
      wildCardGamesBack: string;
      winningPercentage: string;
      wins: number;
    };
    season: number;
    shortName: string;
    sport: BaseData;
    springLeague: SpringLeague;
    springVenue: {
      id: number;
      link: string;
    };
    teamCode: string;
    teamName: string;
    venue: BaseData;
  }

  interface Player {
    active: boolean;
    batSide: {
      code: 'L' | 'R' | 'S';
      description: 'Left' | 'Right' | 'Dwitch';
    };
    birthCity: string;
    birthCountry: string;
    birthDate: string;
    birthStateProvince: string;
    boxscoreName: string;
    currentAge: number;
    draftYear: number;
    firstLastName: string;
    firstName: string;
    fullFMLName: string;
    fullLFMName: string;
    fullName: string;
    gender: 'M' | 'F';
    height: string;
    id: number;
    initLastName: string;
    isPlayer: boolean;
    isVerified: boolean;
    lastFirstName: string;
    lastInitName: string;
    lastName: string;
    link: string;
    middleName: string;
    mlbDebutDate: string;
    nameFirstLast: string;
    nameSlug: string;
    nameMatrilineal?: string;
    nickName?: string;
    pitchHand: BasicStatus;
    primaryNumber: string;
    pronunciation?: string;
    primaryPosition: Position;
    strikeZoneBottom: number;
    strikeZoneTop: number;
    useName?: string;
    useLastName?: string;
    weight: number;
  }
  interface Person {
    fullName: string;
    id: number;
    link: string;
  }
  interface UsedRemaining {
    used: number;
    remaining: number;
  }
  interface Official {
    official: Person;
    officialType: string;
  }
  interface LiveTeamDataPlayer {
    gameStatus: {
      isCurrentBatter: boolean;
      isCurrentPitcher: boolean;
      isOnBench: boolean;
      isSubstitute: boolean;
    };
    jerseyNumber: string;
    parentTeamId: number;
    person: Person;
    position: Position;
    seasonStats: SeasonStats;
    stats: {
      // @TODO try to find types from API
      // these empty values may be only available with api creds (stat cast data)
      fielding: object;
      batting: object;
      pitching: object;
    };
    status: BasicStatus;
  }
  interface VenueExtended extends BaseData {
    active: boolean;
    fieldInfo: {
      capacity: number;
      center: number;
      leftCenter: number;
      leftLine: number;
      rightCenter: number;
      rightLine: number;
      roofType: string;
      turfType: string;
    };
    location: {
      address1: string;
      azimuthAngle: number;
      city: string;
      country: string;
      defaultCoordinates: {
        latitude: number;
        longitude: number;
      };
      elevation: number;
      phone: string;
      postalCode: string;
      state: string;
      stateAbbrev: string;
    };
    season: string;
    timeZone: {
      id: string;
      offset: number;
      offsetAtGameTime: string;
      tz: string;
    };
  }
  interface LiveTeamData {
    batters: number[];
    battingOrder: number[];
    bench: number[];
    bullpen: number[];
    info: {
      title: string;
      fieldList: LabelValue[];
    };
    note: LabelValue[];
    pitchers: number[];
    players: {
      [key: string]: LiveTeamDataPlayer;
    };
    team: {
      allStarStatus: YN;
      id: number;
      link: string;
      name: string;
      springLeague: SpringLeague;
    };
  }

  interface Count {
    balls: number;
    strikes: number;
    outs: number;
  }

  interface PlayEventBase {
    count: Count;
    endTime: string;
    index: number;
    isPitch: boolean;
    playId: string;
    playId: string;
    startTime: string;
    type: string;
  }

  interface PitchData {
    startSpeed: number;
    endSpeed: number;
    strikeZoneTop: number;
    strikeZoneBottom: number;
    coordinates: {
      aY: number;
      aZ: number;
      pfxX: number;
      pfxZ: number;
      pX: number;
      pZ: number;
      vX0: number;
      vY0: number;
      vZ0: number;
      x: number;
      y: number;
      x0: number;
      y0: number;
      z0: number;
      aX: number8;
    };
    breaks: {
      breakAngle: number;
      breakLength: number;
      breakY: number;
      breakVertical: number;
      breakVerticalInduced: number;
      breakHorizontal: number;
      spinRate?: number;
      spinDirection?: number;
    };
    zone: number;
    typeConfidence: number;
    plateTime: number;
    extension?: number;
  }

  interface PitchPlayEvent extends PlayEventBase {
    type: 'pitch';
    playId: string;
    pitchNumber: number;
    pitchData: PitchData;
    details: {
      ballColor: string;
      call: BasicStatus;
      code: string;
      description: string;
      hasReview: boolean;
      isBall: boolean;
      isInPlay: boolean;
      isOut: boolean;
      isStrike: boolean;
      type: BasicStatus;
      trailColor: string;
    };
  }

  interface NoPitchPlayEvent extends PlayEventBase {
    type: 'no_pitch';
    details: {
      call: BasicStatus;
      code: string;
      description: string;
      hasReview: boolean;
      isBall: boolean;
      isInPlay: boolean;
      isOut: boolean;
      isStrike?: boolean;
      violation?: {
        type: string;
        description: string;
        player: {
          id: number;
          link: string;
        };
      };
    };
  }

  interface ActionPlayEvent extends PlayEventBase {
    type: 'action';
    player?: {
      id: string;
      link: string;
    };
    details: {
      awayScore: number;
      description: string;
      event: string;
      eventType: string;
      hasReview: boolean;
      homeScore: number;
      isOut: boolean;
      isScoringPlay: boolean;
    };
  }

  export interface PitcherActionPlayEvent extends PlayEventBase {
    details: {
      description: string;
      code: string;
      disengagementNum: number;
      fromCatcher: boolean;
      hasReview: boolean;
      isOut: boolean;
    };
  }

  export interface StepoffPlayEvent extends PitcherActionPlayEvent {
    type: 'stepoff';
  }

  export interface PickoffPlayEvent extends PitcherActionPlayEvent {
    type: 'pickoff';
  }

  export type PlayEvent =
    | PitchPlayEvent
    | NoPitchPlayEvent
    | ActionPlayEvent
    | StepoffPlayEvent
    | PickoffPlayEvent;

  interface TeamScoreData {
    hits: number;
    runs: number;
    errors: number;
    leftOnBase: number;
  }
  interface LiveInningData {
    num: number;
    ordinalNum: string;
    home: TeamScoreData;
    away: TeamScoreData;
  }
  interface Credit {
    credit: string;
    player: {
      id: string;
      link: string;
    };
    position: Position;
  }
  interface RunnerData {
    credits: Credit[];
    details: {
      event: string;
      eventType: string;
      isScoringEvent: boolean;
      movementReason: string | null;
      playIndex: number;
      rbi: boolean;
      responsiblePitcher: Person | null;
      runner: Person;
      teamUnearned: boolean;
    };
    movement: {
      end: string | null;
      isOut: boolean;
      originBase: string | null;
      outBase: string | null;
      outNumber: number;
      start: string | null;
    };
  }
  interface Hit {
    batter: Person;
    coordinates: { x: number; y: number };
    description: string;
    inning: number;
    pitcher: Person;
    team: {
      allStarStatus: YN;
      id: number;
      name: string;
      springLeague: SpringLeague;
    };
    type: string;
  }

  interface PlayByInning {
    bottom: number[];
    endIndex: number;
    hits: {
      home: Hit[];
      away: Hit[];
    };
    startIndex: number;
    top: number[];
  }
  interface PlayData {
    about: {
      atBatIndex: number;
      captivatingIndex: number;
      endTime: string;
      halfInning: string;
      hasOut: boolean;
      hasReview?: boolean;
      inning: number;
      isComplete: boolean;
      isScoringPlay: boolean;
      isTopInning: boolean;
      startTime: string;
    };
    actionIndex: number[];
    atBatIndex: number;
    count: Count;
    matchup: {
      batSide: BasicStatus;
      batter: Person;
      batterHotColdZones: any[];
      pitchHand: BasicStatus;
      pitcher: Person;
      pitcherHotColdZones: any[];
      splits: {
        batter: string;
        menOnBase: string;
        pitcher: string;
      };
    };
    pitchIndex: number[];
    playEndTime: string;
    playEvents: [];
    result: {
      awayScore: number;
      description: string;
      event: string;
      eventType: string;
      homeScore: number;
      isOut: boolean;
      rbi: number;
      type: string;
    };
    runnerIndex: number[];
    runners: RunnerData[];
  }

  interface LiveFeedGame {
    calendarEventID: string;
    doubleHeader: YN;
    gameNumber: number;
    id: string;
    pk: number;
    season: string;
    seasonDisplay: string;
    tiebeaker: YN;
    type: string;
  }

  export interface LiveFeedData {
    copyright: string;
    gameData: {
      alerts: [];
      datetime: {
        dateTime: string;
        originalDate: string;
        ampm: AMPM;
        dayNight: DayNight;
        officialDate: string;
        time: string;
      };
      flags: {
        awayTeamNoHitter: boolean;
        awayTeamPerfectGame: boolean;
        homeTeamNoHitter: boolean;
        homeTeamPerfectGame: boolean;
      };
      game: LiveFeedGame;
      gameInfo: {
        attendance?: number;
        firstPitch: string;
        gameDurationMinutes?: number;
      };
      moundVisits: {
        home: UsedRemaining;
        away: UsedRemaining;
      };
      officialScorer: Person;
      officialVenue: {
        id: number;
        link: string;
      };
      players: {
        [key: string]: Player;
      };
      primaryDatacaster: Person;
      probablePitchers: {
        home: Person;
        away: Person;
      };
      review: {
        away: UsedRemaining;
        home: UsedRemaining;
        hasChallenges: boolean;
      };
      status: GameStatus;
      teams: {
        home: TeamFullData;
        away: TeamFullData;
      };
      venue: VenueExtended;
      weather: {
        condition: string;
        temp: string;
        wind: string;
      };
    };
    gamePk: number;
    link: string;
    liveData: {
      boxscore: {
        teams: {
          home: LiveTeamData;
          away: LiveTeamData;
        };
        // best guess for pitcking notes (empty) @TODO Check pitching notes type from API
        // these empty values may be only available with api creds (stat cast data)
        pitchingNotes: LabelValue[];
        officials: Official[];
        info: LabelValue[];
      };
      decisions?: {
        winner: Person;
        loser: Person;
      };
      leaders: {
        hitDistance: object;
        hitSpeed: object;
        pitchSpeed: object;
      };
      linescore: {
        balls: number;
        currentInning: number;
        currentInningOrdinal: string;
        defense: {
          batter: Person;
          battingOrder: number;
          catcher: Person;
          center: Person;
          first: Person;
          inHole: Person;
          left: Person;
          onDeck: Person;
          pitcher: Person;
          right: Person;
          second: Person;
          shortstop: Person;
          team: BaseData;
          third: Person;
        };
        inningHalf: string;
        inningState: strng;
        innings: LiveInningData[];
        isTopInning: boolean;
        offense: {
          batter: Person;
          battingOrder: number;
          inHole: Person;
          onDeck: Person;
          pitcher: Person;
          team: BaseData;
        };
        outs: number;
        scheduledInnings: number;
        strikes: number;
        teams: {
          home: TeamScoreData;
          away: TeamScoreData;
        };
      };
      plays: {
        allPlays: PlayData[];
        currentPlay: PlayData;
        playsByInning: PlayByInning[];
        scoringPlays: number[];
      };
    };
    metaData: {
      gameEvents: string[];
      logicalEvents: string[];
      timeStamp: string;
      wait: number;
    };
  }
}
