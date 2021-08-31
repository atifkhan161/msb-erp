export interface Meta {
  created: number;
  revision: string;
  version: number;
  updated?: number;
}

export interface Base {
  $loki?: number;
  meta?: Meta;
}