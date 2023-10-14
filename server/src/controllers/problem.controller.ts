import { Request, Response } from 'express';
import Problem, { ILightProblem, IProblem } from '../models/problem.model';
import { testCode } from '../services/testcode.service';
import { successResponse } from '../services/response.service';

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
  const problem: IProblem | null = await Problem.findById(id);
  if (!problem) {
    res.status(404).send('Problem not found');
    return;
  }
  const testCases = problem.testCases;

  const baseCode = problem.baseCodes.find((code) => code.language === lang);
  if (!baseCode) {
    res.status(404).send('Code not found');
    return;
  }
  
  const keyResult = await testCode(src, lang, testCases, baseCode.callResult);

  const url = `${req.protocol}://${req.get('host')}/api/code/result/${keyResult}`;

  res.status(200).send(successResponse(url));
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
};
