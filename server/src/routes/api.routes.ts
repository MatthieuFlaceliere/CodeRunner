import express, { Router } from 'express';
import codeController from '../controllers/code.controller';
import problemController from '../controllers/problem.controller';

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
router.post('/code/run', codeController.runCode);

/**
 * @openapi
 * /api/code/result/{key}:
 *  get:
 *    description: Get code result
 *    tags: [Code]
 *    parameters:
 *      - in: path
 *        name: key
 *        required: true
 *    responses:
 *       '200':
 *         description: Successful code execution
 */
router.get('/code/result/:key', codeController.getCodeResult);

/**
 * @openapi
 * /api/problems:
 *  get:
 *    description: Get all problems
 *    tags: [Problem]
 *    responses:
 *      '200':
 *        description: Successful request
 */
router.get('/problems', problemController.getProblems);

/**
 * @openapi
 * /api/problem/{id}:
 *  get:
 *    description: Get problem by id
 *    tags: [Problem]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    responses:
 *      '200':
 *        description: Successful request
 */
router.get('/problem/:id', problemController.getProblem);

/**
 * @openapi
 * /api/problem:
 *   post:
 *     description: Create a new problem
 *     tags: [Problem]
 *     requestBody:
 *       description: Problem to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               testCases:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     input:
 *                       type: object
 *                     output:
 *                       type: object
 *               baseCodes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     callResult:
 *                       type: string
 *                     language:
 *                       type: string
 *                     code:
 *                       type: string
 *       required:
 *         - title
 *         - description
 *         - difficulty
 *         - tags
 *         - testCases
 *     responses:
 *       '201':
 *         description: Successful request
 */
router.post('/problem', problemController.createProblem);

/**
 * @openapi
 * /api/problem/{id}:
 *   put:
 *     description: Modify a problem
 *     tags: [Problem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       description: Problem to be modified
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               testCases:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     input:
 *                       type: object
 *                     output:
 *                       type: object
 *               baseCodes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     language:
 *                       type: string
 *                     code:
 *                       type: string
 *     responses:
 *       '200':
 *         description: Successful request
 */
router.put('/problem/:id', problemController.modifyProblem);

/**
 * @openapi
 * /api/problem/{id}:
 *   delete:
 *     description: Delete a problem
 *     tags: [Problem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       '200':
 *         description: Successful request
 */
router.delete('/problem/:id', problemController.deleteProblem);

/**
 * @openapi
 * /api/problem/{id}/testcode:
 *   post:
 *     description: Test code against problem test cases
 *     tags:
 *       - Problem
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       description: Code to be tested
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               src:
 *                 type: string
 *               lang:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful code execution
 */
router.post('/problem/:id/testcode', problemController.testCodeForProblem);

export default router;
