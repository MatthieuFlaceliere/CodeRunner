import { Request, Response } from 'express';

export const runCode = async (req: Request, res: Response): Promise<void> => {
  const { src, lang } = req.body;
  console.log('src:', src);
  console.log('lang:', lang);

  res.send('Run code...');
};

export const getCodeResult = async (req: Request, res: Response): Promise<void> => {
  res.send('Code result...');
};

export default {
  runCode,
  getCodeResult,
};
