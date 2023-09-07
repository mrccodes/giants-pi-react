declare module 'mlb-api' {
  type YN = 'Y' | 'N';
  type YesNo = 'yes' | 'no';
  type DayNight = 'day' | 'night';
  type AMPM = 'AM' | 'PM';
  interface LinkAndID {
    link: string;
    id: number;
  }
  interface BasicStatus {
    description: string;
    code: string;
  }
  interface LabelValue {
    label: string;
    value: string;
  }
  interface BaseData extends LinkAndID {
    name: string;
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
  interface Person extends LinkAndID {
    fullName: string;
  }
  interface UsedRemaining {
    used: number;
    remaining: number;
  }
}
