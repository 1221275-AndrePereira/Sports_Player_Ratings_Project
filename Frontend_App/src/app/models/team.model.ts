

export interface Team {
  name: string;
  country: string;
  pot: number;
}

export interface TeamFilter {
  name?: string;
  country?: string;
  pot?: number;
}