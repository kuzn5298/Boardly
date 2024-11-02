import { Router } from 'express';
import { authController } from '@/controllers';
import { authHandler } from '@/middlewares';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 * components:
 *   schemas:
 *     TokenResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: Access token
 *         refreshToken:
 *           type: string
 *           description: Refresh token
 *       required:
 *         - accessToken
 *         - refreshToken
 *     LoginResponse:
 *       type: object
 *       allOf:
 *         - $ref: '#/components/schemas/TokenResponse'
 *         - type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/UserDTO'
 */

/**
 * @swagger
 * /registration:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthUserDTO'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       400:
 *         $ref: '#/components/schemas/BadRequestError'
 *       500:
 *         $ref: '#/components/schemas/ServerError'
 */
router.post('/registration', authController.registration);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthUserDTO'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         $ref: '#/components/schemas/BadRequestError'
 *       401:
 *         $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         $ref: '#/components/schemas/ServerError'
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh authentication tokens
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       401:
 *         $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         $ref: '#/components/schemas/ServerError'
 */
router.post('/refresh', authController.refresh);

/**
 * @swagger
 * /logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout a user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: User logged out successfully
 *       401:
 *         $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         $ref: '#/components/schemas/ServerError'
 */
router.post('/logout', authHandler, authController.logout);

export default router;
