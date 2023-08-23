import { Request, Response } from 'express';
import { RabbitMQService } from '../services/rabbitmq.service';

export const runCode = async (req: Request, res: Response): Promise<void> => {
  const { src, lang } = req.body;
  console.log('src:', src);
  console.log('lang:', lang);

  const rabbitMQService = RabbitMQService.getInstance();
  rabbitMQService.sendCodeToQueue({ src, lang });

  res.send('Run code...');
};

export const getCodeResult = async (req: Request, res: Response): Promise<void> => {
  res.send('Code result...');
};

export default {
  runCode,
  getCodeResult,
};
