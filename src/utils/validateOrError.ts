import { validate } from 'class-validator';
import { ApiError } from '@/errors';

export const validateOrError = async (data: object): Promise<void> => {
  const errors = await validate(data);

  if (errors.length > 0) {
    console.log(errors);
    const validationErrors = errors.map((error) => ({
      field: error.property,
      messages: Object.values(error.constraints || {}),
    }));

    throw ApiError.BadRequest('Data validation error', validationErrors);
  }
};
