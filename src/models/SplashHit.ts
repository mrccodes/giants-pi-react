interface SplashHit {
  batter: {
    firstName: string;
    lastName: string;
  };
  pitcher: {
    firstName: string;
    lastName: string;
  };
  number: number;
  date: moment.Moment;
  opponent: string;
}

export default SplashHit;
