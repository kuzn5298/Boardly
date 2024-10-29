/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date when the user was last updated
 *       required:
 *         - name
 */

export interface IUser {
  _id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
