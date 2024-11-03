import { Router } from 'express';
import { boardController } from '@/controllers';
import { authHandler } from '@/middlewares';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: Board management endpoints
 */

/**
 * @swagger
 *
 * /boards:
 *   post:
 *     tags: [Boards]
 *     summary: Create a new board
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the board
 *                 example: "Project Board"
 *     responses:
 *       201:
 *         description: Board created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardDTO'
 *       400:
 *         $ref: '#/components/schemas/BadRequestError'
 *       401:
 *         $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         $ref: '#/components/schemas/ServerError'
 */
router.post('/', authHandler, boardController.createBoard);

/**
 * @swagger
 *
 * /boards:
 *   get:
 *     tags: [Boards]
 *     summary: Get boards by user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of boards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BoardDTO'
 *       400:
 *         $ref: '#/components/schemas/BadRequestError'
 *       401:
 *         $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         $ref: '#/components/schemas/ServerError'
 */
router.get('/', authHandler, boardController.getBoardsByUser);

/**
 * @swagger
 *
 * /boards/{id}:
 *   put:
 *     tags: [Boards]
 *     summary: Update a board by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The board ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardDTO'
 *     responses:
 *       200:
 *         description: Board updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardDTO'
 *       400:
 *         $ref: '#/components/schemas/BadRequestError'
 *       401:
 *         $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         $ref: '#/components/schemas/NotFoundError'
 *       500:
 *         $ref: '#/components/schemas/ServerError'
 */
router.put('/:id', authHandler, boardController.updateBoard);

/**
 * @swagger
 *
 * /boards/{id}:
 *   delete:
 *     tags: [Boards]
 *     summary: Delete a board by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The board ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Board deleted
 *       401:
 *         $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         $ref: '#/components/schemas/NotFoundError'
 *       500:
 *         $ref: '#/components/schemas/ServerError'
 */
router.delete('/:id', authHandler, boardController.deleteBoard);

/**
 * @swagger
 *
 * /boards/{id}/users:
 *   post:
 *     tags: [Boards]
 *     summary: Add a user to a board
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The board ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to add
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: User added to board successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardDTO'
 *       400:
 *         $ref: '#/components/schemas/BadRequestError'
 *       401:
 *         $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         $ref: '#/components/schemas/NotFoundError'
 *       500:
 *         $ref: '#/components/schemas/ServerError'
 */
router.post('/:id/users', authHandler, boardController.addUserToBoard);

/**
 * @swagger
 *
 * /boards/{id}/users/{userId}:
 *   delete:
 *     tags: [Boards]
 *     summary: Remove a user from a board
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The board ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User removed from board
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardDTO'
 *       400:
 *         $ref: '#/components/schemas/BadRequestError'
 *       401:
 *         $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         $ref: '#/components/schemas/NotFoundError'
 *       500:
 *         $ref: '#/components/schemas/ServerError'
 */
router.delete(
  '/:id/users/:userId',
  authHandler,
  boardController.removeUserFromBoard
);

export default router;
