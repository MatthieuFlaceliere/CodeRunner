import { Request, Response } from 'express';
import Problem, { ILightProblem, IProblem } from '../models/problem.model';
import { parseResult, testCode } from '../services/testcode.service';
import { errorResponse, successResponse } from '../services/response.service';
import { RedisClient } from '..';

//#region METHOD GET

export const getProblems = async (req: Request, res: Response): Promise<void> => {
  try {
    const problems: ILightProblem[] = await Problem.find(
      {},
      {
        title: 1,
        difficulty: 1,
        tags: 1,
      },
    );

    res.status(200).send(problems);
  } catch (error: unknown) {
    if (error instanceof Error) res.status(500).send(error.message);
    else res.status(500).send('Internal server error');
  }
};

export const getProblem = async (req: Request, res: Response): Promise<void> => {
  try {
    const problem: IProblem | null = await Problem.findById(req.params.id);

    if (!problem) res.status(404).send('Problem not found');

    res.status(200).send(problem);
  } catch (error: unknown) {
    if (error instanceof Error) res.status(500).send(error.message);
    else res.status(500).send('Internal server error');
  }
};

//#endregion METHOD GET

//#region METHOD POST

const createProblem = async (req: Request, res: Response): Promise<void> => {
  try {
    const problem: IProblem = req.body;

    const newProblem: IProblem = await new Problem(problem).save();

    if (!newProblem) res.status(500).send('Internal server error');

    res.status(201).send(newProblem);
  } catch (error: unknown) {
    if (error instanceof Error) res.status(500).send(error.message);
    else res.status(500).send('Internal server error');
  }
};

const testCodeForProblem = async (req: Request, res: Response): Promise<void> => {
  const { src, lang } = req.body;
  const { id } = req.params;

  if (!src || !lang || !id) res.status(400).send('Bad request');

  // Get problem test cases
  const problem: IProblem | null = await Problem.findById(id).select('testCases baseCodes').exec();
  if (!problem) {
    res.status(404).send('Problem not found');
    return;
  }

  const baseCode = problem.baseCodes.find((code) => code.language === lang);
  if (!baseCode) {
    res.status(404).send('Code not found');
    return;
  }

  const keyResult = await testCode(src, lang, baseCode.codeForTest);

  const url = `/problem/${id}/testcode/result/${keyResult}`;

  res.status(200).send(successResponse(url));
};

const testCodeForProblemResult = async (req: Request, res: Response): Promise<void> => {
  const { key } = req.params;

  try {
    const result = await RedisClient.get(key);

    res.status(200).send(successResponse(result ? parseResult(result) : null));
  } catch (error: unknown) {
    if (error instanceof Error) res.status(500).send(errorResponse(error.message, 500));
    else res.status(500).send(errorResponse('Internal server error', 500));
  }
};

//#endregion METHOD POST

//#region METHOD PUT

const modifyProblem = async (req: Request, res: Response): Promise<void> => {
  try {
    const problem: IProblem = req.body;

    const updatedProblem: IProblem | null = await Problem.findByIdAndUpdate(req.params.id, problem, { new: true });

    if (!updatedProblem) res.status(500).send('Internal server error');

    res.status(200).send(updatedProblem);
  } catch (error: unknown) {
    if (error instanceof Error) res.status(500).send(error.message);
    else res.status(500).send('Internal server error');
  }
};

//#endregion METHOD PUT

//#region METHOD DELETE

const deleteProblem = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProblem: IProblem | null = await Problem.findByIdAndDelete(req.params.id);

    if (!deletedProblem) res.status(500).send('Internal server error');

    res.status(200).send(deletedProblem);
  } catch (error: unknown) {
    if (error instanceof Error) res.status(500).send(error.message);
    else res.status(500).send('Internal server error');
  }
};

//#endregion METHOD DELETE

export default {
  getProblems,
  getProblem,
  createProblem,
  modifyProblem,
  deleteProblem,
  testCodeForProblem,
  testCodeForProblemResult,
};
