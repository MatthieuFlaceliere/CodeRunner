import { Request, Response } from 'express';
import { CodeRunner } from '../services/docker.service';
import { successResponse } from '../services/response.service';

export const runCode = (req: Request, res: Response): void => {
  const { src, lang } = req.body;

  const codeRunner = new CodeRunner();
  try {
    const keyResult = codeRunner.runCode(src, lang);
    const url = `${req.protocol}://${req.get('host')}/api/code/result/${keyResult}`;
    res.status(202).send(successResponse(url));
  } catch (error) {
    console.log('Error:', error);
  }
};

export const getCodeResult = async (req: Request, res: Response): Promise<void> => {
  res.send('Code result...');
};

export default {
  runCode,
  getCodeResult,
};
