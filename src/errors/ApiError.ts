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

export class ApiError extends Error {
  readonly status: number;
  readonly errors: Object[];

  constructor(status: number, message?: string, errors: Object[] = []) {
    super(message ?? ERROR_MESSAGES[status] ?? ERROR_MESSAGES[0]);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, ERROR_MESSAGES[401]);
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
