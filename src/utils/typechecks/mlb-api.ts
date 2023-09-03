/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AMPM,
  ActionPlayEvent,
  BaseData,
  BasicStatus,
  Count,
  Credit,
  GameStatus,
  Hit,
  LabelValue,
  LiveFeedData,
  LiveFeedGame,
  LiveInningData,
  LiveTeamData,
  LiveTeamDataPlayer,
  NoPitchPlayEvent,
  Person,
  PickoffPlayEvent,
  PitchData,
  PitchPlayEvent,
  PitcherActionPlayEvent,
  PlayByInning,
  PlayData,
  PlayEvent,
  PlayEventBase,
  Player,
  Position,
  Record,
  RecordWithTies,
  RunnerData,
  SeasonStats,
  SpringLeague,
  StepoffPlayEvent,
  TeamFullData,
  TeamScoreData,
  UsedRemaining,
  VenueExtended,
} from 'mlb-api';

import { DEBUG_MODE } from '../../config';

export const isLiveFeedData = (obj: any): obj is LiveFeedData => {
  if (!obj || typeof obj !== 'object') return false;

  const gameDataValid = isGameData(obj?.gameData);
  const metaDataValid = isMetaData(obj?.metaData);
  const liveDataValid = isLiveData(obj?.liveData);

  !gameDataValid &&
    DEBUG_MODE &&
    console.error('Invalid game data passed: \n', obj?.gameData);
  !metaDataValid &&
    DEBUG_MODE &&
    console.error('Invalid meta data passed: \n', obj?.metaData);
  !liveDataValid &&
    DEBUG_MODE &&
    console.error('Invalid live data passed: \n', obj?.liveData);

  return (
    typeof obj?.copyright === 'string' &&
    gameDataValid &&
    metaDataValid &&
    liveDataValid
  );
};

const isLiveData = (obj: any): obj is LiveFeedData['liveData'] => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    obj?.boxscore &&
    obj.boxscore?.teams &&
    obj.boxscore.teams?.home &&
    obj.boxscore.teams?.away &&
    isLiveTeamData(obj.boxscore.teams.home) &&
    isLiveTeamData(obj.boxscore.teams.away) &&
    (!obj?.decisions ||
      (obj?.decisions &&
        obj.decisions?.winner &&
        obj.decisions?.loser &&
        isPerson(obj.decisions.winner) &&
        isPerson(obj.decisions.loser))) &&
    obj?.leaders &&
    // when possible refine these
    typeof obj.leaders?.hitDistance === 'object' &&
    typeof obj.leaders?.hitSpeed === 'object' &&
    typeof obj.leaders?.pitchSpeed === 'object' &&
    isLinescore(obj?.linescore) &&
    obj?.plays &&
    Array.isArray(obj.plays?.allPlays) &&
    // @TODO Gather all type possibilities for play types (probably wont be used anyway)
    obj.plays.allPlays.every(isPlayData) &&
    isPlayData(obj.plays?.currentPlay) &&
    Array.isArray(obj.plays?.playsByInning) &&
    obj.plays?.playsByInning.every(isPlayByInning) &&
    isNumberArray(obj.plays?.scoringPlays)
  );
};

const isPlayByInning = (obj: any): obj is PlayByInning => {
  if (!obj || typeof obj !== 'object') return false;

  const isValid =
    isNumberArray(obj?.bottom) &&
    typeof obj?.endIndex === 'number' &&
    typeof obj?.hits === 'object' &&
    Array.isArray(obj?.hits?.home) &&
    Array.isArray(obj?.hits?.away) &&
    obj.hits.home.every(isHit) &&
    obj.hits.away.every(isHit) &&
    typeof obj?.startIndex === 'number' &&
    isNumberArray(obj?.top);
  !isValid &&
    DEBUG_MODE &&
    console.error('isPlayByInning -> invalid object passed \n\n', obj);
  return isValid;
};
const isHit = (obj: any): obj is Hit => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    isPerson(obj?.batter) &&
    obj?.coordinates &&
    typeof obj.coordinates?.x === 'number' &&
    typeof obj.coordinates?.y === 'number' &&
    typeof obj?.description === 'string' &&
    typeof obj?.inning === 'number' &&
    isPerson(obj?.pitcher) &&
    obj?.team &&
    isYN(obj.team?.allStarStatus) &&
    typeof obj.team?.id === 'number' &&
    typeof obj.team?.name === 'string' &&
    isSpringLeague(obj.team?.springLeague) &&
    typeof obj?.type === 'string';
  !isValid &&
    DEBUG_MODE &&
    console.error('isHit -> invalid object passed \n\n', obj);
  return isValid;
};

const isPlayData = (obj: any): obj is PlayData => {
  const isValid =
    typeof obj?.about?.atBatIndex === 'number' &&
    typeof obj?.about?.captivatingIndex === 'number' &&
    typeof obj?.about?.endTime === 'string' &&
    typeof obj?.about?.halfInning === 'string' &&
    (!obj?.about?.hasOut || typeof obj?.about?.hasOut === 'boolean') &&
    (!obj.about?.hasReview || typeof obj?.about?.hasReview === 'boolean') &&
    typeof obj?.about?.inning === 'number' &&
    typeof obj?.about?.isComplete === 'boolean' &&
    (!obj?.about?.isScoringPlay ||
      typeof obj?.about?.isScoringPlay === 'boolean') &&
    typeof obj?.about?.isTopInning === 'boolean' &&
    typeof obj?.about?.startTime === 'string' &&
    isNumberArray(obj?.actionIndex) &&
    isCount(obj?.count) &&
    isBasicStatus(obj?.matchup?.batSide) &&
    isPerson(obj?.matchup?.batter) &&
    Array.isArray(obj?.matchup?.batterHotColdZones) &&
    isBasicStatus(obj?.matchup?.pitchHand) &&
    isPerson(obj?.matchup?.pitcher) &&
    Array.isArray(obj?.matchup?.pitcherHotColdZones) &&
    typeof obj?.matchup?.splits?.batter === 'string' &&
    typeof obj?.matchup?.splits?.menOnBase === 'string' &&
    typeof obj?.matchup?.splits?.pitcher === 'string' &&
    (!obj.matchup?.postOnThird || isPerson(obj.matchup?.postOnThird)) &&
    (!obj.matchup?.postOnFirst || isPerson(obj.matchup?.postOnFirst)) &&
    (!obj.matchup?.postOnSecond || isPerson(obj.matchup?.postOnSecond)) &&
    isNumberArray(obj?.pitchIndex) &&
    typeof obj?.playEndTime === 'string' &&
    Array.isArray(obj?.playEvents) &&
    obj?.playEvents.every(isPlayEvent) &&
    typeof obj?.result?.awayScore === 'number' &&
    typeof obj?.result?.homeScore === 'number' &&
    typeof obj?.result?.type === 'string' &&
    (!obj?.result?.description ||
      typeof obj?.result?.description === 'string') &&
    (!obj?.result?.event || typeof obj?.result?.event === 'string') &&
    (!obj?.result?.eventType || typeof obj?.result?.eventType === 'string') &&
    (!obj?.result?.isOut || typeof obj?.result?.isOut === 'boolean') &&
    (!obj?.result?.rbi || typeof obj?.result?.rbi === 'number') &&
    Array.isArray(obj?.runnerIndex) &&
    Array.isArray(obj?.runners) &&
    obj?.runners.every(isRunnerData);

  !isValid &&
    DEBUG_MODE &&
    console.error('isPlayData -> Error: Invalid object passed \n\n', obj);
  return isValid;
};

const isLinescore = (
  obj: any,
): obj is LiveFeedData['liveData']['linescore'] => {
  const isValid =
    typeof obj?.balls === 'number' &&
    typeof obj?.currentInning === 'number' &&
    typeof obj?.currentInningOrdinal === 'string' &&
    isPerson(obj?.defense?.batter) &&
    typeof obj?.defense?.battingOrder === 'number' &&
    isPerson(obj?.defense?.catcher) &&
    isPerson(obj?.defense?.center) &&
    isPerson(obj?.defense?.first) &&
    isPerson(obj?.defense?.inHole) &&
    isPerson(obj?.defense?.left) &&
    isPerson(obj?.defense?.onDeck) &&
    isPerson(obj?.defense?.pitcher) &&
    isPerson(obj?.defense?.right) &&
    isPerson(obj?.defense?.second) &&
    isPerson(obj?.defense?.shortstop) &&
    isPerson(obj?.defense?.third) &&
    isBaseData(obj?.defense?.team) &&
    typeof obj?.inningHalf === 'string' &&
    typeof obj?.inningState === 'string' &&
    Array.isArray(obj?.innings) &&
    obj?.innings.every(isLiveInningData) &&
    typeof obj?.isTopInning === 'boolean' &&
    isPerson(obj?.offense?.batter) &&
    typeof obj?.offense?.battingOrder === 'number' &&
    isPerson(obj?.offense?.inHole) &&
    isPerson(obj?.offense?.onDeck) &&
    isPerson(obj?.offense?.pitcher) &&
    isBaseData(obj?.offense?.team) &&
    typeof obj?.outs === 'number' &&
    typeof obj?.scheduledInnings === 'number' &&
    typeof obj?.strikes === 'number' &&
    isTeamScoreData(obj?.teams?.home) &&
    isTeamScoreData(obj?.teams?.away);
  !isValid &&
    DEBUG_MODE &&
    console.error('isLinescore -> Error: Invalid object passed \n\n', obj);

  return isValid;
};

const isTeamScoreData = (obj: any): obj is TeamScoreData => {
  let isValid =
    obj &&
    typeof obj === 'object' &&
    typeof obj?.hits === 'number' &&
    typeof obj?.errors === 'number' &&
    typeof obj?.leftOnBase === 'number';

  if (obj?.runs && typeof obj?.runs !== 'number') {
    isValid = false;
  }

  !isValid &&
    DEBUG_MODE &&
    console.error('isTeamScoreData -> Error: Invalid object passed \n\n', obj);
  return isValid;
};
const isLiveInningData = (obj: any): obj is LiveInningData => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    typeof obj?.num === 'number' &&
    typeof obj?.ordinalNum === 'string' &&
    isTeamScoreData(obj?.home) &&
    isTeamScoreData(obj?.away);
  !isValid &&
    DEBUG_MODE &&
    console.error('isLiveInningData -> Error: Invalid object passed \n\n', obj);
  return isValid;
};

const isGameData = (obj: any): obj is LiveFeedData['gameData'] => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    Array.isArray(obj?.alerts) &&
    isDatetime(obj?.datetime) &&
    isFlags(obj?.flags) &&
    isLiveFeedGame(obj?.game) &&
    isGameInfo(obj?.gameInfo) &&
    isGameDataMoundVisits(obj?.moundVisits) &&
    isPerson(obj?.officialScorer) &&
    typeof obj?.officialVenue?.link === 'string' &&
    typeof obj?.officialVenue?.id === 'number' &&
    isPlayers(obj?.players) &&
    isPerson(obj.primaryDatacaster) &&
    isPerson(obj?.probablePitchers?.home) &&
    isPerson(obj?.probablePitchers?.away) &&
    isGameDataReview(obj?.review) &&
    isGameStatus(obj?.status) &&
    isTeamFullData(obj?.teams.home) &&
    isTeamFullData(obj?.teams.away) &&
    isVenueExtended(obj?.venue) &&
    obj?.weather &&
    typeof obj?.weather?.condition === 'string' &&
    typeof obj?.weather?.temp === 'string' &&
    typeof obj?.weather?.wind === 'string';
  !isValid &&
    DEBUG_MODE &&
    console.error('isGameData -> Error: Invalid object passed \n\n', obj);
  return isValid;
};

export const isGameStatus = (input: any): input is GameStatus => {
  const isValid =
    input &&
    typeof input === 'object' &&
    typeof input.abstractGameCode === 'string' &&
    typeof input.abstractGameState === 'string' &&
    typeof input.codedGameState === 'string' &&
    typeof input.detailedState === 'string' &&
    typeof input.startTimeTBD === 'boolean' &&
    typeof input.statusCode === 'string';

  !isValid &&
    DEBUG_MODE &&
    console.error('isGameStatus -> Error: Invalid object passed \n\n', input);
  return isValid;
};

const isGameDataReview = (
  obj: any,
): obj is LiveFeedData['gameData']['review'] => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    isUsedRemaining(obj?.home) &&
    isUsedRemaining(obj?.away) &&
    typeof obj?.hasChallenges === 'boolean';
  !isValid &&
    DEBUG_MODE &&
    console.error('isGameDatReview -> Error: Invalid object passed \n\n', obj);
  return isValid;
};

export const isTeamFullData = (input: any): input is TeamFullData => {
  const isValid =
    typeof input.abbreviation === 'string' &&
    typeof input.active === 'boolean' &&
    isYN(input.allStarStatus) &&
    typeof input.clubName === 'string' &&
    isBaseData(input.division) &&
    typeof input.fileCode === 'string' &&
    typeof input.firstYearOfPlay === 'string' &&
    typeof input.franchiseName === 'string' &&
    typeof input.id === 'number' &&
    isBaseData(input.league) &&
    typeof input.link === 'string' &&
    typeof input.locationName === 'string' &&
    typeof input.name === 'string' &&
    typeof input.record === 'object' &&
    typeof input.record.conferenceGamesBack === 'string' &&
    typeof input.record.divisionGamesBack === 'string' &&
    typeof input.record.divisionLeader === 'boolean' &&
    typeof input.record.gamesPlayed === 'number' &&
    typeof input.record.leagueGamesBack === 'string' &&
    isRecordWithTies(input.record.leagueRecord) &&
    typeof input.record.losses === 'number' &&
    typeof input.record.records === 'object' &&
    typeof input.record.sportGamesBack === 'string' &&
    typeof input.record.springLeagueGamesBack === 'string' &&
    typeof input.record.wildCardGamesBack === 'string' &&
    typeof input.record.winningPercentage === 'string' &&
    typeof input.record.wins === 'number' &&
    typeof input.season === 'number' &&
    typeof input.shortName === 'string' &&
    isBaseData(input.sport) &&
    isSpringLeague(input.springLeague) &&
    typeof input.springVenue === 'object' &&
    typeof input.springVenue.id === 'number' &&
    typeof input.springVenue.link === 'string' &&
    typeof input.teamCode === 'string' &&
    typeof input.teamName === 'string' &&
    isBaseData(input.venue);
  !isValid &&
    DEBUG_MODE &&
    console.error('isTeamFullData -> Error: Invalid object passed \n\n', input);
  return isValid;
};

const isUsedRemaining = (input: any): input is UsedRemaining => {
  const isValid =
    typeof input.used === 'number' && typeof input.remaining === 'number';
  !isValid &&
    DEBUG_MODE &&
    console.error('isUsedRemaining -> Error: invalid obj passed \n\n', input);
  return isValid;
};

const isGameDataMoundVisits = (
  obj: any,
): obj is LiveFeedData['gameData']['moundVisits'] => {
  const isValid = isUsedRemaining(obj.home) && isUsedRemaining(obj.away);
  !isValid &&
    DEBUG_MODE &&
    console.error(
      'isGameDataMoundVisits -> Error: invalid obj passed \n\n',
      obj,
    );
  return isValid;
};

const isRecord = (obj: any): obj is Record => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    typeof obj?.wins === 'number' &&
    typeof obj?.losses === 'number' &&
    typeof obj?.pct === 'string';
  !isValid &&
    DEBUG_MODE &&
    console.error('isRecord -> Error: invalid obj passed \n\n', obj);
  return isValid;
};

const isRecordWithTies = (obj: any): obj is RecordWithTies => {
  const isValid = typeof obj?.ties === 'number' && isRecord(obj);
  !isValid &&
    DEBUG_MODE &&
    console.error('isRecordWithTies -> Error: invalid obj passed \n\n', obj);
  return isValid;
};

const isDatetime = (obj: any): obj is LiveFeedData['gameData']['datetime'] => {
  if (!obj || typeof obj !== 'object') return false;
  const isValid =
    typeof obj?.dateTime === 'string' &&
    typeof obj?.originalDate === 'string' &&
    typeof obj?.officialDate === 'string' &&
    typeof obj?.time === 'string' &&
    isAMPM(obj?.ampm) &&
    isDayNight(obj?.dayNight);
  !isValid &&
    DEBUG_MODE &&
    console.error('isDateTime -> Error: invalid object passed\n ', obj);
  return isValid;
};

const isLiveFeedGame = (input: any): input is LiveFeedGame => {
  const isValid =
    typeof input.calendarEventID === 'string' &&
    isYN(input.doubleHeader) &&
    typeof input.gameNumber === 'number' &&
    typeof input.id === 'string' &&
    typeof input.pk === 'number' &&
    typeof input.season === 'string' &&
    typeof input.seasonDisplay === 'string' &&
    isYN(input.tiebreaker) &&
    typeof input.type === 'string';

  !isValid &&
    DEBUG_MODE &&
    console.error('isLiveFeedGame -> Error: invalid object passed\n ', input);
  return isValid;
};

const isGameInfo = (
  input: any,
): input is LiveFeedData['gameData']['gameInfo'] => {
  const isValid =
    (!input.attendance || typeof input.attendance === 'number') &&
    (!input.gameDurationMinutes ||
      typeof input.gameDurationMinutes === 'number') &&
    typeof input.firstPitch === 'string';

  !isValid &&
    DEBUG_MODE &&
    console.error('isGameInfo -> Error: invalid object passed\n ', input);
  return isValid;
};

const isAMPM = (obj: any): obj is AMPM => {
  const isValid =
    obj && typeof obj === 'string' && (obj === 'AM' || obj === 'PM');
  !isValid &&
    DEBUG_MODE &&
    console.error('isAMPM -> Error: invalid object passed\n ', obj);
  return isValid;
};

const isYN = (input: any): input is 'Y' | 'N' => {
  const isValid = input === 'Y' || input === 'N';
  !isValid &&
    DEBUG_MODE &&
    console.error('isYN -> Error: invalid object passed\n ', input);

  return isValid;
};

const isPerson = (obj: any): obj is Person => {
  if (!obj || typeof obj !== 'object') return false;
  const isValid =
    typeof obj.fullName === 'string' &&
    typeof obj.link === 'string' &&
    typeof obj.id === 'number';

  !isValid &&
    DEBUG_MODE &&
    console.error('isPerson -> Error: invalid object passed\n', obj);
  return isValid;
};

const isPlayers = (input: any): input is { [key: string]: Player } => {
  for (const key in input) {
    if (!isPlayer(input[key])) {
      return false;
    }
  }
  return true;
};

const isPlayer = (input: any): input is Player => {
  const batSide = input?.batSide;

  let isValid =
    typeof input?.active === 'boolean' &&
    (batSide?.code === 'L' || batSide?.code === 'R' || batSide?.code === 'S') &&
    (batSide?.description === 'Left' ||
      batSide?.description === 'Right' ||
      batSide?.description === 'Switch') &&
    typeof input?.birthCity === 'string' &&
    typeof input?.birthCountry === 'string' &&
    typeof input?.birthDate === 'string' &&
    typeof input?.boxscoreName === 'string' &&
    typeof input?.currentAge === 'number' &&
    typeof input?.firstLastName === 'string' &&
    typeof input?.firstName === 'string' &&
    typeof input?.fullFMLName === 'string' &&
    typeof input?.fullLFMName === 'string' &&
    typeof input?.fullName === 'string' &&
    (input?.gender === 'M' || input?.gender === 'F') &&
    typeof input?.height === 'string' &&
    typeof input?.id === 'number' &&
    typeof input?.initLastName === 'string' &&
    typeof input?.isPlayer === 'boolean' &&
    typeof input?.isVerified === 'boolean' &&
    typeof input?.lastFirstName === 'string' &&
    typeof input?.lastInitName === 'string' &&
    typeof input?.lastName === 'string' &&
    typeof input?.link === 'string' &&
    typeof input?.mlbDebutDate === 'string' &&
    typeof input?.nameFirstLast === 'string' &&
    typeof input?.nameSlug === 'string' &&
    isBasicStatus(input?.pitchHand) &&
    isPosition(input?.primaryPosition) &&
    typeof input?.strikeZoneBottom === 'number' &&
    typeof input?.strikeZoneTop === 'number' &&
    typeof input?.weight === 'number';
  if (
    (input?.nickName && typeof input.nickName !== 'string') ||
    (input?.useName && typeof input.useName !== 'string') ||
    (input?.useLastName && typeof input.useLastName !== 'string') ||
    (input?.pronunciation && typeof input.pronunciation !== 'string') ||
    (input?.nameMatrilineal && typeof input.nameMatrilineal !== 'string') ||
    (input?.draftYear && typeof input.draftYear !== 'number') ||
    (input?.birthStateProvince &&
      typeof input?.birthStateProvince !== 'string') ||
    (input?.middleName && typeof input?.middleName !== 'string')
  ) {
    isValid = false;
  }

  !isValid &&
    DEBUG_MODE &&
    console.error('isPlayer -> Error: invalid object passed \n\n', input);
  return isValid;
};

const isBasicStatus = (obj: any): obj is BasicStatus => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    typeof obj?.code === 'string' &&
    typeof obj?.description === 'string';

  !isValid &&
    DEBUG_MODE &&
    console.error('isBasicStatus -> Error: invalid object passed \n\n', obj);
  return isValid;
};

const isPosition = (obj: any): obj is Position => {
  if (!obj || typeof obj !== 'object') return false;
  const isValid =
    typeof obj?.abbreviation === 'string' &&
    typeof obj?.code === 'string' &&
    typeof obj?.name === 'string' &&
    typeof obj?.type === 'string';
  !isValid &&
    DEBUG_MODE &&
    console.error('isPosition -> invalid object passed/n', obj);
  return isValid;
};

const isBaseData = (obj: any): obj is BaseData => {
  if (!obj || typeof obj !== 'object') return false;

  const isValid =
    typeof obj?.id === 'number' &&
    typeof obj?.name === 'string' &&
    typeof obj?.link === 'string';
  !isValid &&
    DEBUG_MODE &&
    console.error('isBaseData -> Error: Invalid object passed \n\n', obj);
  return isValid;
};

const isDayNight = (obj: any): obj is AMPM => {
  const isValid =
    obj && typeof obj === 'string' && (obj === 'day' || obj === 'night');
  !isValid &&
    DEBUG_MODE &&
    console.error('isDayNight -> Error: Invalid object passed \n\n', obj);
  return isValid;
};

const isFlags = (obj: any): obj is LiveFeedData['gameData']['flags'] => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    typeof obj.awayTeamNoHitter === 'boolean' &&
    typeof obj.awayTeamPerfectGame === 'boolean' &&
    typeof obj.homeTeamNoHitter === 'boolean' &&
    typeof obj.homeTeamPerfectGame === 'boolean';
  !isValid &&
    DEBUG_MODE &&
    console.error('isFlags -> Error: Invalid object passed \n\n', obj);
  return isValid;
};

const isSpringLeague = (obj: any): obj is SpringLeague => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    typeof obj?.abbreviation === 'string' &&
    isBaseData(obj);
  !isValid &&
    DEBUG_MODE &&
    console.error('isSpringLeague -> Error: Invalid object passed \n\n', obj);
  return isValid;
};

const isVenueExtended = (obj: any): obj is VenueExtended => {
  const isValid =
    typeof obj?.active === 'boolean' &&
    typeof obj?.season === 'string' &&
    obj?.fieldInfo &&
    typeof obj.fieldInfo.capacity === 'number' &&
    typeof obj.fieldInfo.center === 'number' &&
    typeof obj.fieldInfo.leftCenter === 'number' &&
    typeof obj.fieldInfo.leftLine === 'number' &&
    typeof obj.fieldInfo.rightCenter === 'number' &&
    typeof obj.fieldInfo.rightLine === 'number' &&
    typeof obj.fieldInfo.roofType === 'string' &&
    typeof obj.fieldInfo.turfType === 'string' &&
    obj?.location &&
    typeof obj.location.address1 === 'string' &&
    typeof obj.location.azimuthAngle === 'number' &&
    typeof obj.location.city === 'string' &&
    typeof obj.location.country === 'string' &&
    obj.location.defaultCoordinates &&
    typeof obj.location.defaultCoordinates.latitude === 'number' &&
    typeof obj.location.defaultCoordinates.longitude === 'number' &&
    typeof obj.location.elevation === 'number' &&
    typeof obj.location.phone === 'string' &&
    typeof obj.location.postalCode === 'string' &&
    typeof obj.location.state === 'string' &&
    typeof obj.location.stateAbbrev === 'string' &&
    obj?.timeZone &&
    typeof obj.timeZone.id === 'string' &&
    typeof obj.timeZone.offset === 'number' &&
    typeof obj.timeZone.offsetAtGameTime === 'number' &&
    typeof obj.timeZone.tz === 'string' &&
    isBaseData(obj);
  !isValid &&
    DEBUG_MODE &&
    console.error('isVenueExtended -> invalid object passed \n\n', obj);

  return isValid;
};

const isLiveTeamDataPlayers = (obj: any): obj is LiveTeamData['players'] => {
  let isValid = true;
  if (!obj || typeof obj !== 'object') {
    isValid = false;
  }

  for (const key in obj) {
    const player = obj[key];

    if (
      (isValid && typeof player?.gameStatus?.isCurrentBatter !== 'boolean') ||
      typeof player?.gameStatus?.isCurrentPitcher !== 'boolean' ||
      typeof player?.gameStatus?.isOnBench !== 'boolean' ||
      typeof player?.gameStatus?.isSubstitute !== 'boolean' ||
      typeof player?.jerseyNumber !== 'string' ||
      typeof player?.parentTeamId !== 'number' ||
      !isPerson(player?.person) ||
      !isPosition(player?.position) ||
      !isSeasonStats(player?.seasonStats) ||
      !isLiveTeamDataPlayerStats(player?.stats) ||
      !isBasicStatus(player?.status)
    ) {
      isValid = false;
      DEBUG_MODE &&
        console.error(
          'isLiveTeamDataPlayers -> invalid object passed \n\n',
          obj,
        );
      return isValid;
    }
  }
  return isValid;
};

const isLiveTeamData = (obj: any): obj is LiveTeamData => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    isLiveTeamDataPlayers(obj?.players) &&
    isNumberArray(obj?.batters) &&
    isNumberArray(obj?.battingOrder) &&
    isNumberArray(obj?.bench) &&
    isNumberArray(obj?.bullpen) &&
    Array.isArray(obj?.info) &&
    obj.info.every(
      (v: any) =>
        typeof v?.title === 'string' && isLabelValueArray(v?.fieldList),
    ) &&
    isLabelValueArray(obj?.note) &&
    isNumberArray(obj?.pitchers) &&
    isLiveTeamDataPlayers(obj?.players) &&
    obj?.team &&
    isYN(obj?.team?.allStarStatus) &&
    typeof obj?.team?.id === 'number' &&
    typeof obj?.team?.link === 'string' &&
    typeof obj?.team?.name === 'string' &&
    isSpringLeague(obj?.team?.springLeague);
  !isValid &&
    DEBUG_MODE &&
    console.error('isLiveTeamData -> Error: invalid object passed \n\n ', obj);

  return isValid;
};

const isSeasonStats = (obj: any): obj is SeasonStats => {
  const isValid =
    typeof obj?.batting?.atBats === 'number' &&
    typeof obj?.batting?.atBatsPerHomeRun === 'string' &&
    typeof obj?.batting?.avg === 'string' &&
    typeof obj?.batting?.babip === 'string' &&
    typeof obj?.batting?.baseOnBalls === 'number' &&
    typeof obj?.batting?.catchersInterference === 'number' &&
    typeof obj?.batting?.caughtStealing === 'number' &&
    typeof obj?.batting?.doubles === 'number' &&
    typeof obj?.batting?.flyOuts === 'number' &&
    typeof obj?.batting?.gamesPlayed === 'number' &&
    typeof obj?.batting?.groundIntoDoublePlay === 'number' &&
    typeof obj?.batting?.groundIntoTriplePlay === 'number' &&
    typeof obj?.batting?.groundOuts === 'number' &&
    typeof obj?.batting?.hitByPitch === 'number' &&
    typeof obj?.batting?.hits === 'number' &&
    typeof obj?.batting?.homeRuns === 'number' &&
    typeof obj?.batting?.intentionalWalks === 'number' &&
    typeof obj?.batting?.leftOnBase === 'number' &&
    typeof obj?.batting?.obp === 'string' &&
    typeof obj?.batting?.ops === 'string' &&
    typeof obj?.batting?.pickoffs === 'number' &&
    typeof obj?.batting?.plateAppearances === 'number' &&
    typeof obj?.batting?.rbi === 'number' &&
    typeof obj?.batting?.runs === 'number' &&
    typeof obj?.batting?.sacBunts === 'number' &&
    typeof obj?.batting?.sacFlies === 'number' &&
    typeof obj?.batting?.slg === 'string' &&
    typeof obj?.batting?.stolenBasePercentage === 'string' &&
    typeof obj?.batting?.stolenBases === 'number' &&
    typeof obj?.batting?.strikeOuts === 'number' &&
    typeof obj?.batting?.totalBases === 'number' &&
    typeof obj?.batting?.triples === 'number' &&
    typeof obj?.fielding?.assists === 'number' &&
    typeof obj?.fielding?.caughtStealing === 'number' &&
    typeof obj?.fielding?.chances === 'number' &&
    typeof obj?.fielding?.errors === 'number' &&
    typeof obj?.fielding?.fielding === 'string' &&
    typeof obj?.fielding?.passedBall === 'number' &&
    typeof obj?.fielding?.pickoffs === 'number' &&
    typeof obj?.fielding?.putOuts === 'number' &&
    typeof obj?.fielding?.stolenBasePercentage === 'string' &&
    typeof obj?.fielding?.stolenBases === 'number' &&
    typeof obj?.pitching?.airOuts === 'number' &&
    typeof obj?.pitching?.atBats === 'number' &&
    typeof obj?.pitching?.balks === 'number' &&
    typeof obj?.pitching?.balls === 'number' &&
    typeof obj?.pitching?.baseOnBalls === 'number' &&
    typeof obj?.pitching?.battersFaced === 'number' &&
    typeof obj?.pitching?.blownSaves === 'number' &&
    typeof obj?.pitching?.catchersInterference === 'number' &&
    typeof obj?.pitching?.caughtStealing === 'number' &&
    typeof obj?.pitching?.completeGames === 'number' &&
    typeof obj?.pitching?.doubles === 'number' &&
    typeof obj?.pitching?.earnedRuns === 'number' &&
    typeof obj?.pitching?.era === 'string' &&
    typeof obj?.pitching?.gamesFinished === 'number' &&
    typeof obj?.pitching?.gamesPitched === 'number' &&
    typeof obj?.pitching?.gamesPlayed === 'number' &&
    typeof obj?.pitching?.gamesStarted === 'number' &&
    typeof obj?.pitching?.groundOuts === 'number' &&
    typeof obj?.pitching?.groundOutsToAirouts === 'string' &&
    typeof obj?.pitching?.hitBatsmen === 'number' &&
    typeof obj?.pitching?.hitByPitch === 'number' &&
    typeof obj?.pitching?.hits === 'number' &&
    typeof obj?.pitching?.hitsPer9Inn === 'string' &&
    typeof obj?.pitching?.holds === 'number' &&
    typeof obj?.pitching?.homeRuns === 'number' &&
    typeof obj?.pitching?.homeRunsPer9 === 'string' &&
    typeof obj?.pitching?.inheritedRunners === 'number' &&
    typeof obj?.pitching?.inheritedRunnersScored === 'number' &&
    typeof obj?.pitching?.inningsPitched === 'string' &&
    typeof obj?.pitching?.intentionalWalks === 'number' &&
    typeof obj?.pitching?.losses === 'number' &&
    typeof obj?.pitching?.numberOfPitches === 'number' &&
    typeof obj?.pitching?.obp === 'string' &&
    typeof obj?.pitching?.outs === 'number' &&
    typeof obj?.pitching?.passedBall === 'number' &&
    typeof obj?.pitching?.pickoffs === 'number' &&
    typeof obj?.pitching?.pitchesPerInning === 'string' &&
    typeof obj?.pitching?.rbi === 'number' &&
    typeof obj?.pitching?.runs === 'number' &&
    typeof obj?.pitching?.runsScoredPer9 === 'string' &&
    typeof obj?.pitching?.sacBunts === 'number' &&
    typeof obj?.pitching?.sacFlies === 'number' &&
    typeof obj?.pitching?.saveOpportunities === 'number' &&
    typeof obj?.pitching?.saves === 'number' &&
    typeof obj?.pitching?.shutouts === 'number' &&
    typeof obj?.pitching?.stolenBasePercentage === 'string' &&
    typeof obj?.pitching?.stolenBases === 'number' &&
    typeof obj?.pitching?.strikeOuts === 'number' &&
    typeof obj?.pitching?.strikePercentage === 'string' &&
    typeof obj?.pitching?.strikeoutWalkRatio === 'string' &&
    typeof obj?.pitching?.strikeoutsPer9Inn === 'string' &&
    typeof obj?.pitching?.strikes === 'number' &&
    typeof obj?.pitching?.triples === 'number' &&
    typeof obj?.pitching?.walksPer9Inn === 'string' &&
    typeof obj?.pitching?.whip === 'string' &&
    typeof obj?.pitching?.wildPitches === 'number' &&
    typeof obj?.pitching?.winPercentage === 'string' &&
    typeof obj?.pitching?.wins === 'number';

  if (!isValid) {
    DEBUG_MODE &&
      console.error('isSeasonStats -> invalid object passed/n', obj);
  }
  return isValid;
};

const isRunnerData = (obj: any): obj is RunnerData => {
  const isValid =
    Array.isArray(obj?.credits) &&
    obj?.credits.every(isCredit) &&
    typeof obj?.details?.event === 'string' &&
    typeof obj?.details?.eventType === 'string' &&
    typeof obj?.details?.isScoringEvent === 'boolean' &&
    (obj?.details?.movementReason === null ||
      typeof obj?.details?.movementReason === 'string') &&
    typeof obj?.details?.playIndex === 'number' &&
    typeof obj?.details?.rbi === 'boolean' &&
    (obj?.details?.responsiblePitcher === null ||
      (typeof obj?.details?.responsiblePitcher?.id === 'number' &&
        typeof obj?.details?.responsiblePitcher?.link === 'string')) &&
    isPerson(obj?.details?.runner) &&
    typeof obj?.details?.teamUnearned === 'boolean' &&
    (obj?.movement?.end === null || typeof obj?.movement?.end === 'string') &&
    typeof obj?.movement?.isOut === 'boolean' &&
    (obj?.movement?.originBase === null ||
      typeof obj?.movement?.originBase === 'string') &&
    (obj?.movement?.outBase === null ||
      typeof obj?.movement?.outBase === 'string') &&
    (obj?.movement?.outNumber === null ||
      typeof obj?.movement?.outNumber === 'number') &&
    (obj?.movement?.start === null || typeof obj?.movement?.start === 'string');

  !isValid &&
    DEBUG_MODE &&
    console.error('isRunnerData -> invalid object passed/n', obj);

  return isValid;
};

const isLiveTeamDataPlayerStats = (
  obj: any,
): obj is LiveTeamDataPlayer['stats'] => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    typeof obj?.fielding === 'object' &&
    typeof obj?.batting === 'object' &&
    typeof obj?.pitching === 'object';
  !isValid &&
    DEBUG_MODE &&
    console.error('isLiveTeamDataPlayerStats -> invalid object passed/n', obj);

  return isValid;
};

const isMetaData = (obj: any): obj is LiveFeedData['metaData'] => {
  const isValid =
    Array.isArray(obj?.gameEvents) &&
    obj.gameEvents.every((item: any) => typeof item === 'string') &&
    Array.isArray(obj?.logicalEvents) &&
    obj.logicalEvents.every((item: any) => typeof item === 'string') &&
    typeof obj?.timeStamp === 'string' &&
    typeof obj?.wait === 'number';
  !isValid &&
    DEBUG_MODE &&
    console.error('isMetaData -> invalid object passed/n', obj);

  return isValid;
};

const isLabelValueArray = (obj: any): obj is LabelValue[] => {
  if (obj.length === 0) return true;

  const isLabelValPair =
    Array.isArray(obj) &&
    obj.length > 0 &&
    obj.every((value: any) => {
      return isLabelValue(value);
    });
  !isLabelValPair &&
    DEBUG_MODE &&
    console.error('isLabelValueArray -> Error: invalid value passed \n\n', obj);
  return isLabelValPair;
};
const isLabelValue = (obj: any): obj is LabelValue[] => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    typeof obj?.value === 'string' &&
    typeof obj?.label === 'string';

  !isValid &&
    DEBUG_MODE &&
    console.error('isLabelValue -> Error: Invalid value passed \n\n', obj);
  return isValid;
};

const isNumberArray = (obj: any): obj is number[] => {
  if (Array.isArray(obj)) {
    if (obj.length === 0) return true;
    const isStringArray =
      obj.length > 0 &&
      obj.every((value) => {
        return typeof value === 'number';
      });

    return isStringArray;
  } else {
    DEBUG_MODE &&
      console.error('isNumberArray -> Error: Invalid value passed \n\n', obj);
    return false;
  }
};

const isCount = (obj: any): obj is Count => {
  if (!obj || typeof obj !== 'object') return false;

  const isValid =
    typeof obj?.balls === 'number' &&
    typeof obj?.strikes === 'number' &&
    typeof obj?.outs === 'number';
  !isValid &&
    DEBUG_MODE &&
    console.error('isCount -> Error: Invalid object passed \n\n', obj);

  return isValid;
};

const isPlayEventBase = (obj: any): obj is PlayEventBase => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    isCount(obj?.count) &&
    typeof obj?.endTime === 'string' &&
    typeof obj?.index === 'number' &&
    typeof obj?.isPitch === 'boolean' &&
    (!obj?.playId || typeof obj.playId === 'string') &&
    typeof obj?.startTime === 'string' &&
    obj?.type;
  !isValid &&
    DEBUG_MODE &&
    console.error('isPlayEventBase -> Error: Invalid object passed \n\n', obj);

  return isValid;
};
const isPlayEvent = (obj: any): obj is PlayEvent => {
  let isValid: boolean;
  switch (obj.type) {
    case 'pitch':
      isValid = isPitchPlayEvent(obj);
      !isValid &&
        DEBUG_MODE &&
        console.error(
          'isPlayEvent -> type: "pitch" ->  Error: Invalid object passed \n\n',
          obj,
        );
      return isValid;
    case 'stepoff':
      isValid = isStepoffPlayEvent(obj);
      !isValid &&
        DEBUG_MODE &&
        console.error(
          'isPlayEvent -> type: "stepoff" ->  Error: Invalid object passed \n\n',
          obj,
        );
      return isValid;
    case 'pickoff':
      isValid = isPickoffPlayEvent(obj);
      !isValid &&
        DEBUG_MODE &&
        console.error(
          'isPlayEvent -> type: "pickoff" ->  Error: Invalid object passed \n\n',
          obj,
        );
      return isValid;
    case 'no_pitch':
      isValid = isNoPitchPlayEvent(obj);
      !isValid &&
        DEBUG_MODE &&
        console.error(
          'isPlayEvent -> type: "no_pitch" ->  Error: Invalid object passed \n\n',
          obj,
        );
      return isValid;
    case 'action':
      isValid = isActionPlayEvent(obj);
      !isValid &&
        DEBUG_MODE &&
        console.error(
          'isPlayEvent -> type: "action" ->  Error: Invalid object passed \n\n',
          obj,
        );
      return isValid;
    default:
      DEBUG_MODE &&
        console.error(
          `isPlayEvent -> Error: invalid objected passed, unknown value for type: \n\n`,
          obj,
        );
      return false;
  }
};

const isActionPlayEvent = (obj: any): obj is ActionPlayEvent => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    obj?.type === 'action' &&
    (!obj?.player ||
      (typeof obj?.player === 'object' &&
        typeof obj.player?.id === 'number' &&
        typeof obj.player?.link === 'string')) &&
    typeof obj?.details === 'object' &&
    typeof obj.details?.awayScore === 'number' &&
    typeof obj.details?.description === 'string' &&
    typeof obj.details?.event === 'string' &&
    typeof obj.details?.eventType === 'string' &&
    typeof obj.details?.hasReview === 'boolean' &&
    typeof obj.details?.homeScore === 'number' &&
    typeof obj.details?.isOut === 'boolean' &&
    typeof obj.details?.isScoringPlay === 'boolean' &&
    isPlayEventBase(obj);

  !isValid &&
    DEBUG_MODE &&
    console.error(
      'isActionPlayEvent -> Error: Invalid object passed \n\n',
      obj,
    );
  return isValid;
};

const isPitcherActionPlayEvent = (obj: any): obj is PitcherActionPlayEvent => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    obj?.details &&
    typeof obj.details?.description === 'string' &&
    typeof obj.details?.code === 'string' &&
    (!obj.details?.disengagementNum ||
      typeof obj.details?.disengagementNum === 'number') &&
    typeof obj.details?.fromCatcher === 'boolean' &&
    typeof obj.details?.hasReview === 'boolean' &&
    typeof obj.details?.isOut === 'boolean' &&
    isPlayEventBase(obj);

  !isValid &&
    DEBUG_MODE &&
    console.error(
      'isPitcherActionPlayEvent -> Error: Invalid object passed \n\n',
      obj,
    );

  return isValid;
};

const isStepoffPlayEvent = (obj: any): obj is StepoffPlayEvent => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    obj?.type === 'stepoff' &&
    isPitcherActionPlayEvent(obj) &&
    isPlayEventBase(obj);

  !isValid &&
    DEBUG_MODE &&
    console.error(
      'isStepoffPlayEvent -> Error: Invalid object passed \n\n',
      obj,
    );
  return isValid;
};
const isPickoffPlayEvent = (obj: any): obj is PickoffPlayEvent => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    obj?.type === 'pickoff' &&
    isPitcherActionPlayEvent(obj) &&
    isPlayEventBase(obj);

  !isValid &&
    DEBUG_MODE &&
    console.error(
      'isPickoffPlayEvent -> Error: Invalid object passed \n\n',
      obj,
    );
  return isValid;
};

const isNoPitchPlayEvent = (obj: any): obj is NoPitchPlayEvent => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    obj?.type === 'no_pitch' &&
    typeof obj?.details === 'object' &&
    typeof obj.details?.code === 'string' &&
    (!obj?.pitchId || typeof obj.pitchId === 'string') &&
    (!obj.detials?.call || isBasicStatus(obj.details?.call)) &&
    (!obj.detials?.hasReview || typeof obj.details?.hasReview === 'boolean') &&
    (!obj.details?.isBall || typeof obj.details.isBall === 'boolean') &&
    (!obj.details?.isInPlay || typeof obj.details.isInPlay === 'boolean') &&
    (!obj.details?.isOut || typeof obj.details.isOut === 'boolean') &&
    (!obj.details?.disengagementNum ||
      typeof obj.details.disengagementNum === 'number') &&
    (!obj.detials?.isStrike || typeof obj.details?.isStrike === 'boolean') &&
    (!obj.detials?.violation ||
      (typeof obj.details?.violation === 'object' &&
        typeof obj.details.violation?.type === 'string' &&
        typeof obj.details.violation?.description === 'string' &&
        typeof obj.details.violation?.player === 'object' &&
        typeof obj.details.violation.player?.id === 'number' &&
        typeof obj.details.violation.player?.fullName === 'string')) &&
    isPlayEventBase(obj);

  !isValid &&
    DEBUG_MODE &&
    console.error(
      'isNoPitchPlayEvent -> Error: Invalid object passed \n\n',
      obj,
    );
  return isValid;
};

const isPitchPlayEvent = (obj: any): obj is PitchPlayEvent => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    obj?.type === 'pitch' &&
    (!obj?.pitchId || typeof obj.pitchId === 'string') &&
    typeof obj?.pitchNumber === 'number' &&
    typeof obj?.pitchData === 'object' &&
    isPitchData(obj?.pitchData) &&
    typeof obj?.details === 'object' &&
    isBasicStatus(obj.details?.call) &&
    typeof obj.details?.description === 'string' &&
    typeof obj.details?.code === 'string' &&
    (!obj.details?.ballColor || typeof obj.details?.ballColor === 'string') &&
    (!obj.details?.trailColor || typeof obj.details?.trailColor === 'string') &&
    typeof obj.details?.isInPlay === 'boolean' &&
    typeof obj.details?.isStrike === 'boolean' &&
    (!obj.details.type || isBasicStatus(obj.details.type)) &&
    typeof obj.details?.isOut === 'boolean' &&
    typeof obj.details?.hasReview === 'boolean' &&
    isPlayEventBase(obj);
  !isValid &&
    DEBUG_MODE &&
    console.error('isPitchPlayEvent -> Error: invalid object passed /n/n', obj);
  return isValid;
};

const isPitchData = (obj: any): obj is PitchData => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    typeof obj?.strikeZoneTop === 'number' &&
    typeof obj?.strikeZoneBottom === 'number' &&
    (!obj?.zone || typeof obj?.zone === 'number') &&
    (!obj?.plateTime || typeof obj?.plateTime === 'number') &&
    typeof obj?.coordinates === 'object' &&
    (!obj?.startSpeed || typeof obj?.startSpeed === 'number') &&
    (!obj?.endSpeed || typeof obj?.endSpeed === 'number') &&
    (!obj.coordinates?.aX || typeof obj.coordinates.aX === 'number') &&
    (!obj.coordinates?.aY || typeof obj.coordinates.aY === 'number') &&
    (!obj.coordinates?.aZ || typeof obj.coordinates.aZ === 'number') &&
    (!obj.coordinates?.pX || typeof obj.coordinates.pX === 'number') &&
    (!obj.coordinates?.pZ || typeof obj.coordinates.pZ === 'number') &&
    (!obj.coordinates?.pfxX || typeof obj.coordinates.pfxX === 'number') &&
    (!obj.coordinates?.pfxZ || typeof obj.coordinates.pfxZ === 'number') &&
    (!obj.coordinates?.vX0 || typeof obj.coordinates.vX0 === 'number') &&
    (!obj.coordinates?.vY0 || typeof obj.coordinates.vY0 === 'number') &&
    (!obj.coordinates?.vZ0 || typeof obj.coordinates.vZ0 === 'number') &&
    (!obj.coordinates?.x || typeof obj.coordinates.x === 'number') &&
    (!obj.coordinates?.y || typeof obj.coordinates.y === 'number') &&
    (!obj.coordinates?.x0 || typeof obj.coordinates.x0 === 'number') &&
    (!obj.coordinates?.y0 || typeof obj.coordinates.y0 === 'number') &&
    (!obj.coordinates?.z0 || typeof obj.coordinates.z0 === 'number') &&
    typeof obj?.breaks === 'object' &&
    (!obj.breaks?.breakAngle || typeof obj.breaks?.breakAngle === 'number') &&
    (!obj.breaks?.breakVertical ||
      typeof obj.breaks?.breakVertical === 'number') &&
    (!obj.breaks?.breakVerticalInduced ||
      typeof obj.breaks?.breakVerticalInduced === 'number') &&
    (!obj.breaks?.breakHorizontal ||
      typeof obj.breaks?.breakHorizontal === 'number') &&
    (!obj.breaks?.breakY || typeof obj.breaks?.breakY === 'number') &&
    (!obj.breaks?.breakLength || typeof obj.breaks?.breakLength === 'number') &&
    (!obj.break?.spinRate || typeof obj.breaks?.spinRate === 'number') &&
    (!obj.break?.spinDirection ||
      typeof obj.breaks?.spinDirection === 'number') &&
    (!obj?.typeConfidence || typeof obj?.typeConfidence === 'number') &&
    (!obj?.extension || typeof obj?.extension === 'number');

  !isValid &&
    DEBUG_MODE &&
    console.error('isPitchData -> Error: invalid object passed /n/n', obj);
  return isValid;
};

const isCredit = (obj: any): obj is Credit => {
  const isValid =
    obj &&
    typeof obj === 'object' &&
    typeof obj?.credit === 'string' &&
    isPosition(obj?.position) &&
    obj?.player &&
    typeof obj.player?.id === 'number' &&
    typeof obj.player?.link === 'string';
  !isValid &&
    DEBUG_MODE &&
    console.error('isCredit -> Error: invalid object passed /n/n', obj);

  return isValid;
};
