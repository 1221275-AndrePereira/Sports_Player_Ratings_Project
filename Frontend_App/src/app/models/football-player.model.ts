

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
  fifa97Rating?: FIFARating;
  fifa98Rating?: FIFARating;
  fifa99Rating?: FIFARating;
  fifa2000Rating?: FIFARating;
  fifa2001Rating?: FIFARating;
  fifa2002Rating?: FIFARating;
  fifa2003Rating?: FIFARating;
  fifa2004Rating?: FIFARating;
  fifa2005Rating?: FIFARating;
  fifa06Rating?: FIFARating;
  fifa07Rating?: FIFARating;
  fifa08Rating?: FIFARating;
  fifa09Rating?: FIFARating;
  fifa10Rating?: FIFARating;
  fifa11Rating?: FIFARating;
  fifa12Rating?: FIFARating;
  fifa13Rating?: FIFARating;
  fifa14Rating?: FIFARating;
  fifa15Rating?: FIFARating;
  fifa16Rating?: FIFARating;
  fifa17Rating?: FIFARating;
  fifa18Rating?: FIFARating;
  fifa19Rating?: FIFARating;
  fifa20Rating?: FIFARating;
  fifa21Rating?: FIFARating;
  fifa22Rating?: FIFARating;
  fifa23Rating?: FIFARating;
  eafc24Rating?: FIFARating;
  eafc25Rating?: FIFARating;
  eafc26Rating?: FIFARating;
}