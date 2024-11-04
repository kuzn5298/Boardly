import { Exclude, Expose, Type } from 'class-transformer';
import { UserDTO } from './UserDTO';

/**
 * @swagger
 * components:
 *   schemas:
 *     BoardDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The board id
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           description: The board name
 *           example: "Project Board"
 *         owner:
 *           $ref: '#/components/schemas/UserDTO'
 *           description: The board owner
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserDTO'
 *           description: The board users
 *       required:
 *         - id
 *         - name
 *         - owner
 *         - users
 */
@Exclude()
export class BoardDTO {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Type(() => UserDTO)
  @Expose()
  owner!: UserDTO;

  @Type(() => UserDTO)
  @Expose()
  users!: UserDTO[];
}
