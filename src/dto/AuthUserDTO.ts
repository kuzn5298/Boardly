import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthUserDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           description: Password of the user
 *           example: "password123"
 *           minLength: 8
 *       required:
 *         - email
 *         - password
 */
export class AuthUserDTO {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  constructor(data: AuthUserDTO) {
    this.email = data.email;
    this.password = data.password;
  }
}
