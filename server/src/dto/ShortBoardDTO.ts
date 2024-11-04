import { Exclude, Expose } from 'class-transformer';

/**
 * @swagger
 * components:
 *   schemas:
 *     ShortBoardDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the board
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           description: The name of the board
 *           example: "Project Board"
 *       required:
 *         - id
 *         - name
 */
@Exclude()
export class ShortBoardDTO {
  @Expose()
  id!: string;
  @Expose()
  name!: string;
}
