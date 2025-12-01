

export interface FIFARating {
  overallRating: number;
  club: string;
  position: string;
}

export interface FootballPlayerFilter {
  playerName?: string;
  country?: string;
}

export interface FootballPlayer {
  playerId: string;
  playerName: string;
  country: string;
  fifA96Rating?: FIFARating;
  fifA97Rating?: FIFARating;
  fifA98Rating?: FIFARating;
  fifA99Rating?: FIFARating;
  fifA2000Rating?: FIFARating;
  fifA2001Rating?: FIFARating;
  fifA2002Rating?: FIFARating;
  fifA2003Rating?: FIFARating;
  fifA2004Rating?: FIFARating;
  fifA2005Rating?: FIFARating;
  fifA06Rating?: FIFARating;
  fifA07Rating?: FIFARating;
  fifA08Rating?: FIFARating;
  fifA09Rating?: FIFARating;
  fifA10Rating?: FIFARating;
  fifA11Rating?: FIFARating;
  fifA12Rating?: FIFARating;
  fifA13Rating?: FIFARating;
  fifA14Rating?: FIFARating;
  fifA15Rating?: FIFARating;
  fifA16Rating?: FIFARating;
  fifA17Rating?: FIFARating;
  fifA18Rating?: FIFARating;
  fifA19Rating?: FIFARating;
  fifA20Rating?: FIFARating;
  fifA21Rating?: FIFARating;
  fifA22Rating?: FIFARating;
  fifA23Rating?: FIFARating;
  eafC24Rating?: FIFARating;
  eafC25Rating?: FIFARating;
  eafC26Rating?: FIFARating;
}