import express, { Router } from 'express';
import apiController from '../controllers/code.controller';

const router: Router = express.Router();

/**
 * @openapi
 * /api/code/run:
 *  post:
 *    description: Run code
 *    tags: [Code]
 *    requestBody:
 *       description: Code to be executed
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               src:
 *                 type: string
 *               lang:
 *                type: string
 *    responses:
 *       '200':
 *         description: Successful code execution
 */
router.post('/code/run', apiController.runCode);

/**
 * @openapi
 * /api/code/result:
 *  get:
 *    description: Get code result
 *    tags: [Code]
 *    responses:
 *       '200':
 *         description: Successful code execution
 */
router.get('/code/result/:key', apiController.getCodeResult);

export default router;
