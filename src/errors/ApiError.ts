type ErrorMessageMap = {
  [key: number]: string;
};

const ERROR_MESSAGES: ErrorMessageMap = {
  400: 'Invalid request syntax.',
  401: 'Authentication required.',
  404: 'Resource not found.',
  500: 'Internal server error.',
  0: 'Unknown error occurred.',
};

/**
 * @swagger
 * components:
 *   schemas:
 *     ApiError:
 *       description: Bad request error
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Invalid request syntax."
 *                errors:
 *                  type: array
 *                  example: "[]"
 *                  items:
 *                    type: object
 *                    properties:
 *                      field:
 *                        type: string
 *                      messages:
 *                        type: array
 *                      items:
 *                        type: string
 *     BadRequestError:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiError'
 *         - type: object
 *           description: Bad request error
 *           content:
 *            application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   example: "Invalid request syntax."
 *                 errors:
 *                   example: "[]"
 *     UnauthorizedError:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiError'
 *         - type: object
 *           description: Unauthorized error
 *           content:
 *            application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   example: "Authentication required."
 *                 errors:
 *                   example: "[]"
 *     NotFoundError:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiError'
 *         - type: object
 *           description: Not found error
 *           content:
 *            application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   example: "Resource not found."
 *                 errors:
 *                   example: "[]"
 *     ServerError:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiError'
 *         - type: object
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 properties:
 *                   message:
 *                     example: "Internal server error."
 *                   errors:
 *                     example: "[]"
 */

export class ApiError extends Error {
  readonly status: number;
  readonly errors: Object[];

  constructor(status: number, message?: string, errors: Object[] = []) {
    super(message ?? ERROR_MESSAGES[status] ?? ERROR_MESSAGES[0]);
    this.status = status;
    this.errors = errors;
  }

  static Unauthorized(message: string = ERROR_MESSAGES[401]) {
    return new ApiError(401, message);
  }

  static BadRequest(
    message: string = ERROR_MESSAGES[400],
    errors: Object[] = []
  ) {
    return new ApiError(400, message, errors);
  }

  static NotFound(message: string = ERROR_MESSAGES[404]) {
    return new ApiError(404, message);
  }

  static InternalServerError() {
    return new ApiError(500, ERROR_MESSAGES[500]);
  }

  static UnknownError() {
    return new ApiError(500, ERROR_MESSAGES[0]);
  }
}
