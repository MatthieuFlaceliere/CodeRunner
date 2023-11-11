import { Request, Response } from 'express';
import { runCodeInDocker } from '../services/docker.service';
import { successResponse, errorResponse } from '../services/response.service';
import { RedisClient } from '../index';

export const runCode = (req: Request, res: Response): void => {
  const { src, lang } = req.body;

  try {
    const keyResult = runCodeInDocker(src, lang);

    const url = `/code/result/${keyResult}`;

    res.status(202).send(successResponse(url));
  } catch (error: unknown) {
    if (error instanceof Error) res.status(500).send(errorResponse(error.message, 500));
    else res.status(500).send(errorResponse('Internal server error', 500));
  }
};

export const getCodeResult = async (req: Request, res: Response): Promise<void> => {
  const { key } = req.params;

  try {
    const result = await RedisClient.get(key);

    res.status(200).send(successResponse(result ?? null));
  } catch (error: unknown) {
    if (error instanceof Error) res.status(500).send(errorResponse(error.message, 500));
    else res.status(500).send(errorResponse('Internal server error', 500));
  }
};

export default {
  runCode,
  getCodeResult,
};
