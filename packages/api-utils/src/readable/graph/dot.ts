export type Dot = {
  from?: string;
  to?: string;
  verb: string;
  voice: string;
  object: Value;
};

export type Value = {
  type: string;
  content: string;
};
