import bcrypt from 'bcryptjs';
import { QueryFailedError } from 'typeorm';
import { User } from '@/entities';
import { AuthUserDTO, UserDTO } from '@/dto';
import { validateOrError } from '@/utils';
import { AppDataSource } from '@/config/orm';
import { ApiError } from '@/errors';
import { tokenService } from '.';
import { JwtPayload } from 'jsonwebtoken';

const userRepository = AppDataSource.getRepository(User);

export const registration = async (authUser: AuthUserDTO): Promise<UserDTO> => {
  const { email, password } = authUser;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepository.create({ email, password: hashedPassword });
  await validateOrError(user);
  try {
    await userRepository.save(user);
  } catch (error) {
    if (error instanceof QueryFailedError) {
      if (error.driverError.code === '23505') {
        throw ApiError.BadRequest('Email already in use');
      }
    }
    throw error;
  }
  const userDTO = new UserDTO(user);
  return userDTO;
};

export const login = async (authUser: AuthUserDTO) => {
  const { email, password } = authUser;
  const user = await userRepository.findOne({
    where: { email },
  });

  const isPassEquals = await bcrypt.compare(password, user?.password ?? '');

  if (!user || !isPassEquals) {
    throw ApiError.BadRequest('Invalid credentials');
  }

  const userDTO = new UserDTO(user);
  const tokens = tokenService.generateTokens(user.id);
  await tokenService.saveRefreshToken(user.id, tokens.refreshToken);
  return { ...tokens, user: userDTO };
};

export const refresh = async (token: string) => {
  const isTokenExists = await tokenService.findToken(token);
  if (!isTokenExists) throw ApiError.Unauthorized('Invalid refresh token');
  const { userId } = tokenService.validateRefreshToken(token) as JwtPayload;
  const tokens = tokenService.generateTokens(userId);
  await tokenService.saveRefreshToken(userId, tokens.refreshToken);
  return tokens;
};

export const logout = async (token: string) => {
  await tokenService.removeToken(token);
};
