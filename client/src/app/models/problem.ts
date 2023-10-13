export interface IProblem {
  _id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  testCases: {
    input: object;
    output: string;
  }[];
  solutions: {
    language: string;
    code: string;
  }[];
}

export interface ILightProblem {
  _id: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
}

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}
