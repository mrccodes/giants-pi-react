declare module 'mlb-api/live-feed' {
  import type {
    YN,
    AMPM,
    DayNight,
    UsedRemaining,
    Person,
    LinkAndID,
  } from 'mlb-api';
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
      postOnThird?: Person;
      postOnFirst?: Person;
      postOnSecond?: Person;
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
      description?: string;
      event?: string;
      eventType?: string;
      homeScore: number;
      isOut?: boolean;
      rbi?: number;
      type: string;
    };
    runnerIndex: number[];
    runners: RunnerData[];
  }

  interface SpringLeague extends BaseData {
    abbreviation: string;
  }

  interface SeasonStats {
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

  interface PlayEventBase {
    count: Count;
    endTime: string;
    index: number;
    isPitch: boolean;
    playId?: string;
    startTime: string;
    type: string;
  }

  interface PitchData {
    strikeZoneTop: number;
    strikeZoneBottom: number;
    startSpeed?: number;
    endSpeed?: number;
    coordinates: {
      aY?: number;
      aZ?: number;
      pfxX?: number;
      pfxZ?: number;
      pX?: number;
      pZ?: number;
      vX0?: number;
      vY0?: number;
      vZ0?: number;
      x?: number;
      y?: number;
      x0?: number;
      y0?: number;
      z0?: number;
      aX?: number8;
    };
    breaks: {
      breakAngle?: number;
      breakLength?: number;
      breakY?: number;
      breakVertical?: number;
      breakVerticalInduced?: number;
      breakHorizontal?: number;
      spinRate?: number;
      spinDirection?: number;
    };
    zone?: number;
    typeConfidence?: number;
    plateTime?: number;
    extension?: number;
  }

  interface PitchPlayEvent extends PlayEventBase {
    type: 'pitch';
    pitchNumber: number;
    playId?: number;
    pitchData: PitchData;
    details: {
      ballColor?: string;
      trailColor?: string;
      type?: BasicStatus;
      hasReview: boolean;
      call: BasicStatus;
      code: string;
      description: string;
      isBall: boolean;
      isInPlay: boolean;
      isOut: boolean;
      isStrike: boolean;
    };
  }

  interface NoPitchPlayEvent extends PlayEventBase {
    type: 'no_pitch';
    details: {
      call?: BasicStatus;
      code: string;
      description: string;
      hasReview?: boolean;
      isBall?: boolean;
      isInPlay?: boolean;
      isOut?: boolean;
      isStrike?: boolean;
      disengagementNum?: number;
      violation?: {
        type: string;
        description: string;
        player: LinkAndID;
      };
    };
  }

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
    player: LinkAndID;
    position: Position;
  }

  interface Count {
    balls: number;
    strikes: number;
    outs: number;
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
  interface ActionPlayEvent extends PlayEventBase {
    type: 'action';
    player?: LinkAndID;
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
      disengagementNum?: number;
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

  interface LiveFeedTeamData {
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
    springVenue: LinkAndID;
    teamCode: string;
    teamName: string;
    venue: BaseData;
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
  interface Official {
    official: Person;
    officialType: string;
  }

  interface Player extends Person {
    active: boolean;
    batSide: {
      code: 'L' | 'R' | 'S';
      description: 'Left' | 'Right' | 'Switch';
    };
    birthCity?: string;
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
    gender: 'M' | 'F';
    height: string;
    initLastName: string;
    isPlayer: boolean;
    isVerified: boolean;
    lastFirstName: string;
    lastInitName: string;
    lastName: string;
    middleName: string;
    mlbDebutDate?: string;
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

  interface LiveFeedData {
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
      officialVenue: LinkAndID;
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
        home: LiveFeedTeamData;
        away: LiveFeedTeamData;
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
}
