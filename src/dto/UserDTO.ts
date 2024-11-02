/**
 * @swagger
 * components:
 *   schemas:
 *     UserDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the user
 *           example: "3282bae6-b58e-4217-afc6-8c9ed1e5b8dd"
 *         email:
 *           type: string
 *           description: The email of the user
 *           example: "user@example.com"
 *       required:
 *         - id
 *         - email
 */

export class UserDTO {
  id!: string;
  email!: string;

  constructor(data: UserDTO) {
    this.id = data.id;
    this.email = data.email;
  }
}
