/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AMPM,
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
  Person,
  PlayByInning,
  PlayData,
  PlayEvent,
  Player,
  Position,
  Record,
  RecordWithTies,
  RunnerData,
  SpringLeague,
  TeamFullData,
  TeamScoreData,
  UsedRemaining,
  VenueExtended,
} from 'mlb-api';

export const isLiveFeedData = (obj: any): obj is LiveFeedData => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    typeof obj?.copyright === 'string' &&
    isGameData(obj?.gameData) &&
    isMetaData(obj?.metaData) &&
    isLiveData(obj?.liveData)
  );
};

const isLiveData = (obj: any): obj is LiveFeedData['liveData'] => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    obj?.boxscore &&
    obj.boxscore?.teams &&
    obj.boxscore.teams?.home &&
    obj.boxscore.teams?.away &&
    isLiveTeamData(obj.boxscore.team.home) &&
    isLiveTeamData(obj.boxscore.team.away) &&
    obj?.descisions &&
    obj.descisions?.winner &&
    obj.descisions?.loser &&
    isPerson(obj.descisions.winner) &&
    isPerson(obj.descisions.loser) &&
    obj?.leaders &&
    // when possible refine these
    typeof obj.leaders?.hitDistance === 'object' &&
    typeof obj.leaders?.hitSpeed === 'object' &&
    typeof obj.leaders?.pitchSpeed === 'object' &&
    isLinescore(obj?.linescore) &&
    obj?.plays &&
    Array.isArray(obj.plays?.allPlays) &&
    obj.plays.allPlays.every(isPlayData) &&
    isPlayData(obj.plays?.currentPlay) &&
    Array.isArray(obj.plays?.playsByInning) &&
    obj.plays.playsByinning.every(isPlayByInning) &&
    isNumberArray(obj.plays?.scoringPlays)
  );
};

const isPlayByInning = (obj: any): obj is PlayByInning => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    isNumberArray(obj?.bottom) &&
    typeof obj?.endIndex === 'number' &&
    Array.isArray(obj?.hits) &&
    obj.hits.every(isHit) &&
    typeof obj?.startIndex === 'number' &&
    isNumberArray(obj?.top)
  );
};
const isHit = (obj: any): obj is Hit => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    isPerson(obj?.batter) &&
    obj?.coordinates &&
    typeof obj.coordinates?.x === 'number' &&
    typeof obj.coordinates?.y === 'number' &&
    typeof obj?.description === 'string' &&
    typeof obj?.description === 'string' &&
    typeof obj?.inning === 'number' &&
    isPerson(obj?.pitcher) &&
    obj?.team &&
    isYN(obj?.team?.allStarStatus) &&
    typeof obj?.team?.id === 'string' &&
    typeof obj?.team?.name === 'string' &&
    isSpringLeague(obj?.springLeague) &&
    typeof obj?.type === 'string'
  );
};

const isPlayData = (obj: any): obj is PlayData => {
  return (
    typeof obj?.about?.atBatIndex === 'number' &&
    typeof obj?.about?.captivatingIndex === 'number' &&
    typeof obj?.about?.endTime === 'string' &&
    typeof obj?.about?.halfInning === 'string' &&
    typeof obj?.about?.hasOut === 'boolean' &&
    typeof obj?.about?.hasReview === 'boolean' &&
    typeof obj?.about?.inning === 'number' &&
    typeof obj?.about?.isComplete === 'boolean' &&
    typeof obj?.about?.isScoringPlay === 'boolean' &&
    typeof obj?.about?.isTopInning === 'boolean' &&
    typeof obj?.about?.startTime === 'string' &&
    Array.isArray(obj?.actionIndex) &&
    typeof obj?.atBatIndex === 'number' &&
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
    Array.isArray(obj?.pitchIndex) &&
    typeof obj?.playEndTime === 'string' &&
    Array.isArray(obj?.playEvents) &&
    obj?.playEvents.every(isPlayEvent) &&
    typeof obj?.result?.awayScore === 'number' &&
    typeof obj?.result?.description === 'string' &&
    typeof obj?.result?.event === 'string' &&
    typeof obj?.result?.eventType === 'string' &&
    typeof obj?.result?.homeScore === 'number' &&
    typeof obj?.result?.isOut === 'boolean' &&
    typeof obj?.result?.rbi === 'number' &&
    typeof obj?.result?.type === 'string' &&
    Array.isArray(obj?.runnerIndex) &&
    Array.isArray(obj?.runners) &&
    obj?.runners.every(isRunnerData)
  );
};

const isLinescore = (
  obj: any,
): obj is LiveFeedData['liveData']['linescore'] => {
  return (
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
    isTeamScoreData(obj?.teams?.away)
  );
};

const isTeamScoreData = (obj: any): obj is TeamScoreData => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    typeof obj?.hits === 'number' &&
    typeof obj?.runs === 'number' &&
    typeof obj?.errors === 'number' &&
    typeof obj?.leftOnbase === 'number'
  );
};
const isLiveInningData = (obj: any): obj is LiveInningData => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    typeof obj?.num === 'number' &&
    typeof obj?.ordinalNum === 'string' &&
    isTeamScoreData(obj?.home) &&
    isTeamScoreData(obj?.away)
  );
};

const isGameData = (obj: any): obj is LiveFeedData['gameData'] => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    Array.isArray(obj?.alerts) &&
    isDatetime(obj?.datetime) &&
    isFlags(obj?.flags) &&
    isLiveFeedGame(obj?.game) &&
    isGameInfo(obj?.gameInfo) &&
    isGameDataMoundVisits(obj?.moundVisits) &&
    isPerson(obj?.officialScorer) &&
    typeof obj?.officialVenue?.link === 'string' &&
    typeof obj?.officialVenue?.id === 'string' &&
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
    typeof obj?.weather?.wind === 'string' &&
    typeof obj?.gamePk === 'number' &&
    typeof obj?.link === 'string'
  );
};

export const isGameStatus = (input: any): input is GameStatus => {
  return (
    typeof input.abstractGameCode === 'string' &&
    typeof input.abstractGameState === 'string' &&
    typeof input.codedGameState === 'string' &&
    typeof input.detailedState === 'string' &&
    typeof input.startTimeTBD === 'boolean' &&
    typeof input.statusCode === 'string'
  );
};

const isGameDataReview = (
  obj: any,
): obj is LiveFeedData['gameData']['review'] => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    isUsedRemaining(obj?.home) &&
    isUsedRemaining(obj?.away) &&
    typeof obj?.hasChallenges === 'boolean'
  );
};

export const isTeamFullData = (input: any): input is TeamFullData => {
  return (
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
    typeof input.record.springLeaguesGamesBack === 'string' &&
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
    isBaseData(input.venue)
  );
};

const isUsedRemaining = (input: any): input is UsedRemaining => {
  return typeof input.used === 'number' && typeof input.remaining === 'number';
};

const isGameDataMoundVisits = (
  obj: any,
): obj is LiveFeedData['gameData']['moundVisits'] => {
  return isUsedRemaining(obj.home) && isUsedRemaining(obj.away);
};

const isRecord = (obj: any): obj is Record => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    typeof obj?.wins === 'number' &&
    typeof obj?.losses === 'number' &&
    typeof obj?.pct === 'string'
  );
};

const isRecordWithTies = (obj: any): obj is RecordWithTies => {
  return typeof obj?.ties === 'string' && isRecord(obj);
};

const isDatetime = (obj: any): obj is LiveFeedData['gameData']['datetime'] => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    typeof obj?.dateTime === 'string' &&
    typeof obj?.originalDate === 'string' &&
    typeof obj?.officialDate === 'string' &&
    typeof obj?.time === 'string' &&
    isAMPM(obj?.ampm) &&
    isDayNight(obj?.dayNight) &&
    isPerson(obj?.officialScorer) &&
    typeof obj?.officialVenue.id === 'string' &&
    typeof obj?.officialVenue.link === 'string'
  );
};

const isLiveFeedGame = (input: any): input is LiveFeedGame => {
  return (
    typeof input.calendarEventID === 'string' &&
    isYN(input.doubleHeader) &&
    typeof input.gameNumber === 'number' &&
    typeof input.id === 'string' &&
    typeof input.pk === 'number' &&
    typeof input.season === 'string' &&
    typeof input.seasonDisplay === 'string' &&
    isYN(input.tiebeaker) &&
    typeof input.type === 'string'
  );
};

const isGameInfo = (
  input: any,
): input is LiveFeedData['gameData']['gameInfo'] => {
  return (
    typeof input.attendance === 'number' &&
    typeof input.firstPitch === 'string' &&
    typeof input.gameDurationMinutes === 'number'
  );
};

const isAMPM = (obj: any): obj is AMPM => {
  if (!obj || typeof obj !== 'string') return false;
  return obj === 'AM' || obj === 'PM';
};

const isYN = (input: any): input is 'Y' | 'N' => input === 'Y' || input === 'N';

const isPerson = (obj: any): obj is Person => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    typeof obj.fullName !== 'string' &&
    typeof obj.link !== 'string' &&
    typeof obj.id !== 'number'
  );
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

  return (
    typeof input?.active === 'boolean' &&
    (batSide?.code === 'L' || batSide?.code === 'R' || batSide?.code === 'S') &&
    (batSide?.description === 'left' ||
      batSide?.description === 'right' ||
      batSide?.description === 'switch') &&
    typeof batSide?.birthCity === 'string' &&
    typeof batSide?.birthCountry === 'string' &&
    typeof batSide?.birthDate === 'string' &&
    typeof batSide?.birthStateProvince === 'string' &&
    typeof batSide?.boxscoreName === 'string' &&
    typeof batSide?.currentAge === 'number' &&
    typeof batSide?.draftYear === 'number' &&
    typeof batSide?.firstLastName === 'string' &&
    typeof batSide?.firstName === 'string' &&
    typeof batSide?.fullFMLName === 'string' &&
    typeof batSide?.fullLFMName === 'string' &&
    typeof batSide?.fullName === 'string' &&
    (batSide?.gender === 'M' || batSide?.gender === 'F') &&
    typeof batSide?.height === 'string' &&
    typeof batSide?.id === 'number' &&
    typeof batSide?.initLastName === 'string' &&
    typeof batSide?.isPlayer === 'boolean' &&
    typeof batSide?.isVerified === 'boolean' &&
    typeof batSide?.lastFirstName === 'string' &&
    typeof batSide?.lastInitName === 'string' &&
    typeof batSide?.lastName === 'string' &&
    typeof batSide?.link === 'string' &&
    typeof batSide?.middleName === 'string' &&
    typeof batSide?.mlbDebutDate === 'string' &&
    typeof batSide?.nameFirstLast === 'string' &&
    typeof batSide?.nameSlug === 'string' &&
    typeof batSide?.nickName === 'string' &&
    isBasicStatus(batSide?.pitchHand) &&
    isPosition(batSide?.primaryPosition) &&
    typeof batSide?.strikeZoneBottom === 'number' &&
    typeof batSide?.strikeZoneTop === 'number' &&
    typeof batSide?.useName === 'string' &&
    typeof batSide?.weight === 'number'
  );
};

const isBasicStatus = (obj: any): obj is BasicStatus => {
  if (!obj || typeof obj !== 'object') return false;

  return typeof obj?.code === 'string' && typeof obj?.description === 'string';
};

const isPosition = (obj: any): obj is Position => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    typeof obj?.abbreviation === 'string' &&
    typeof obj?.code === 'string' &&
    typeof obj?.name === 'string' &&
    typeof obj?.type === 'string'
  );
};

const isBaseData = (obj: any): obj is BaseData => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    typeof obj?.id === 'string' &&
    typeof obj?.name === 'string' &&
    typeof obj?.link === 'string'
  );
};

const isDayNight = (obj: any): obj is AMPM => {
  if (!obj || typeof obj !== 'string') return false;
  return obj === 'day' || obj === 'night';
};

const isFlags = (obj: any): obj is LiveFeedData['gameData']['flags'] => {
  if (!obj || typeof obj !== 'object') return false;
  return (
    typeof obj.awayTeamNoHitter === 'boolean' &&
    typeof obj.awayTeamPerfectGame === 'boolean' &&
    typeof obj.homeTeamNoHitter === 'boolean' &&
    typeof obj.homeTeamPerfectGame === 'boolean'
  );
};

const isSpringLeague = (obj: any): obj is SpringLeague => {
  if (!obj || typeof obj !== 'object') return false;

  return typeof obj?.abbreviation === 'string' && isBaseData(obj);
};

const isVenueExtended = (obj: any): obj is VenueExtended => {
  return (
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
    typeof obj.location.defaultCoordinates.laditude === 'number' &&
    typeof obj.location.defaultCoordinates.longitude === 'number' &&
    typeof obj.location.elevation === 'number' &&
    typeof obj.location.phone === 'string' &&
    typeof obj.location.postalCode === 'string' &&
    typeof obj.location.state === 'string' &&
    typeof obj.location.stateAbbrev === 'string' &&
    obj?.timeZone &&
    typeof obj.timeZone.id === 'string' &&
    typeof obj.timeZone.offset === 'number' &&
    typeof obj.timeZone.offsetAtGameTime === 'string' &&
    typeof obj.timeZone.tz === 'string' &&
    isBaseData(obj)
  );
};

const isLiveTeamDataPlayers = (obj: any): obj is LiveTeamData['players'] => {
  if (typeof obj !== 'object' || obj === null) return false;

  for (const key in obj) {
    const player = obj[key];

    if (
      typeof player?.gameStatus?.isCurrentBatter !== 'boolean' ||
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
      return false;
    }
  }
  return true;
};

const isLiveTeamData = (obj: any): obj is LiveTeamData => {
  if (typeof obj !== 'object' || !obj) return false;

  return (
    isLiveTeamDataPlayers(obj?.players) &&
    isNumberArray(obj?.batters) &&
    isNumberArray(obj?.battingOrder) &&
    isNumberArray(obj?.bench) &&
    isNumberArray(obj?.bullpen) &&
    obj?.info &&
    typeof obj?.info?.title === 'string' &&
    isLabelValueArray(obj.info?.fieldList) &&
    isLabelValueArray(obj?.note) &&
    isNumberArray(obj?.pitchers) &&
    isLiveTeamDataPlayers(obj?.players) &&
    obj?.team &&
    isYN(obj?.team?.allStarStatus) &&
    typeof obj?.team?.id === 'string' &&
    typeof obj?.team?.link === 'string' &&
    typeof obj?.team?.name === 'string' &&
    isSpringLeague(obj?.springLeague)
  );
};

const isSeasonStats = (obj: any): obj is LiveTeamDataPlayer['seasonStats'] => {
  return (
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
    typeof obj?.fielding?.stolenBases === 'string' &&
    typeof obj?.pitching?.airOuts === 'number' &&
    typeof obj?.pitching?.atBats === 'number' &&
    typeof obj?.pitching?.balks === 'number' &&
    typeof obj?.pitching?.balls === 'number' &&
    typeof obj?.pitching?.basOnBalls === 'number' &&
    typeof obj?.pitching?.battersFaces === 'number' &&
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
    typeof obj?.pitching?.hitByBitch === 'number' &&
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
    typeof obj?.pitching?.pitchesThrown === 'number' &&
    typeof obj?.pitching?.rbi === 'number' &&
    typeof obj?.pitching?.runs === 'number' &&
    typeof obj?.pitching?.runsScoredPer9 === 'string' &&
    typeof obj?.pitching?.sacBunts === 'number' &&
    typeof obj?.pitching?.sacFlies === 'number' &&
    typeof obj?.pitching?.saveOpportunites === 'number' &&
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
    typeof obj?.pitching?.wins === 'number'
  );
};

const isRunnerData = (obj: any): obj is RunnerData => {
  return (
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
      isPerson(obj?.details?.responsiblePitcher)) &&
    isPerson(obj?.details?.runner) &&
    typeof obj?.details?.teamUnearned === 'boolean' &&
    (obj?.movement?.end === null || typeof obj?.movement?.end === 'string') &&
    typeof obj?.movement?.isOut === 'boolean' &&
    (obj?.movement?.originBase === null ||
      typeof obj?.movement?.originBase === 'string') &&
    (obj?.movement?.outBase === null ||
      typeof obj?.movement?.outBase === 'string') &&
    typeof obj?.movement?.outNumber === 'number' &&
    (obj?.movement?.start === null || typeof obj?.movement?.start === 'string')
  );
};

// Your function for stats, if it's just unknown objects right now
const isLiveTeamDataPlayerStats = (
  obj: any,
): obj is LiveTeamDataPlayer['stats'] => {
  return (
    typeof obj?.fielding === 'object' &&
    typeof obj?.batting === 'object' &&
    typeof obj?.pitching === 'object'
  );
};

const isMetaData = (obj: any): obj is LiveFeedData['metaData'] => {
  return (
    Array.isArray(obj?.gameEvents) &&
    obj.gameEvents.every((item: any) => typeof item === 'string') &&
    Array.isArray(obj?.logicalEvents) &&
    obj.logicalEvents.every((item: any) => typeof item === 'string') &&
    typeof obj?.timeStamp === 'string' &&
    typeof obj?.wait === 'number'
  );
};

const isLabelValueArray = (obj: any): obj is LabelValue[] => {
  if (Array.isArray(obj)) return false;
  if (obj.length === 0) return true;

  const isLabelValPair =
    obj.length > 0 &&
    obj.every((value: any) => {
      return isLabelValue(value);
    });

  return isLabelValPair;
};
const isLabelValue = (obj: any): obj is LabelValue[] => {
  if (typeof obj !== 'object' || !obj) return false;

  return typeof obj?.value === 'string' && typeof obj?.label === 'string';
};

const isNumberArray = (obj: any): obj is number[] => {
  if (Array.isArray(obj)) {
    if (obj.length === 0) return true;
    const isStringArray =
      obj.length > 0 &&
      obj.every((value) => {
        return typeof value === 'string';
      });

    return isStringArray;
  } else {
    return false;
  }
};

const isCount = (obj: any): obj is Count => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    typeof obj?.balls === 'number' &&
    typeof obj?.strikes === 'number' &&
    typeof obj?.outs === 'number'
  );
};
const isPlayEvent = (obj: any): obj is PlayEvent => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    isCount(obj?.count) &&
    obj?.details &&
    typeof obj.details?.awayScore === 'number' &&
    typeof obj.details?.description === 'string' &&
    typeof obj.details?.event === 'string' &&
    typeof obj.details?.eventType === 'string' &&
    typeof obj.details?.hasReview === 'boolean' &&
    typeof obj.details?.homeScore === 'number' &&
    typeof obj.details?.isOut === 'boolean' &&
    typeof obj.details?.isScoringPlay === 'boolean' &&
    typeof obj?.endTime === 'string' &&
    typeof obj?.index === 'number' &&
    typeof obj?.isPitch === 'boolean' &&
    obj?.player &&
    typeof obj.player?.id === 'number' &&
    typeof obj.player?.link === 'string' &&
    typeof obj?.startTime === 'string' &&
    typeof obj?.type === 'string'
  );
};
const isCredit = (obj: any): obj is Credit => {
  if (!obj || typeof obj !== 'object') return false;

  return (
    typeof obj?.credit === 'string' &&
    isPosition(obj?.position) &&
    obj?.player &&
    typeof obj.player?.id === 'string' &&
    typeof obj.player?.link === 'string'
  );
};
// const isLiveFeedGame = (obj: any): obj is TYPE => {
// if (!obj || typeof obj !== 'EXPECTED_TYPE') return false;

//   return (

//   )
// }
