
export type RegexPattern  = {
  id: string;
  regex: string;
  extractedTerms: string[],
  name: string,
  approved?: boolean;
};


export interface DashboardState  {
  patterns: RegexPattern[]
  text: string
  currentPatternId: string
   approved?: false
   hydrated: boolean 
};