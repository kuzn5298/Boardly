import { Router } from 'express';
import { userController } from '@/controllers';
import { authHandler } from '@/middlewares';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User endpoints
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get a list of users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDTO'
 *       401:
 *         $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         $ref: '#/components/schemas/ServerError'
 */
router.get('/', authHandler, userController.getAllUsers);

/**
 * @swagger
 *
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get a user by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/UserDTO'
 *       401:
 *         $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         $ref: '#/components/schemas/NotFoundError'
 *       500:
 *         $ref: '#/components/schemas/ServerError'
 */
router.get('/:id', authHandler, userController.getUserById);

export default router;
