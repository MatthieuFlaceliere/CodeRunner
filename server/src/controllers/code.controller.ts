import { Request, Response } from 'express';
import { CodeRunner } from '../services/docker.service';
import { successResponse, errorResponse } from '../services/response.service';
import { RedisService } from '../services/redis.service';

export const runCode = (req: Request, res: Response): void => {
  const { src, lang } = req.body;

  const codeRunner = new CodeRunner();
  try {
    const keyResult = codeRunner.runCode(src, lang);
    const url = `${req.protocol}://${req.get('host')}/api/code/result/${keyResult}`;
    res.status(202).send(successResponse(url));
  } catch (error: any) {
    console.log('Error:', error);
    res.status(500).send(errorResponse(error.message, 500));
  }
};

export const getCodeResult = async (req: Request, res: Response): Promise<void> => {
  const { key } = req.params;
  const redisService = new RedisService();
  const result = await redisService.getResult(key);
  res.status(200).send(successResponse(result ? JSON.parse(result) : null));
};

export default {
  runCode,
  getCodeResult,
};
