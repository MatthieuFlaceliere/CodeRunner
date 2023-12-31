export interface IProblem {
  _id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  testCases: {
    input: object;
    output: object;
  }[];
  baseCodes: {
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

export interface ITestCaseResult {
  test_case: {
    [key: number]: {
      result: string;
      output: string;
    };
  };
  stdout: string;
  stderr: string;
  code: number;
}
