import { Schema, model } from 'mongoose';

export interface IProblem {
  _id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  testCases: {
    input: string;
    output: string;
  }[];
  solution: string;
}

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

const testCasesSchema = new Schema(
  {
    input: String,
    output: String,
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
  },
  { timestamps: true },
);

problemSchema.path('_id');

const Problem = model<IProblem>('Problem', problemSchema);

export default Problem;
