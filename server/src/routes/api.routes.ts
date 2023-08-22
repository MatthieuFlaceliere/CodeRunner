import express, { Router } from 'express';

const router: Router = express.Router();

router.post('/run-code', (req, res) => {
  res.send('Run code...');
});

router.get('/code-result', (req, res) => {
  res.send('Code result...');
});

export default router;
