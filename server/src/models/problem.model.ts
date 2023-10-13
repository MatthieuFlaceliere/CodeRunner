import { Schema, model } from 'mongoose';

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

const testCasesSchema = new Schema(
  {
    input: Object,
    output: String,
  },
  { _id: false },
);

const solutionsSchema = new Schema(
  {
    language: String,
    code: String,
  },
  { _id: false },
);

const problemSchema = new Schema<IProblem>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    difficulty: {
      type: String,
      enum: Difficulty,
      default: Difficulty.Easy,
    },
    tags: [String],
    testCases: [testCasesSchema],
    baseCodes: [solutionsSchema],
  },
  { timestamps: true },
);

problemSchema.path('_id');

const Problem = model<IProblem>('Problem', problemSchema);

export default Problem;
