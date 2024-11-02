import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '@/config/env';
import { AppDataSource } from '@/config/orm';
import { RefreshToken } from '@/entities';

const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, config.jwt.accessTokenSecret, {
    expiresIn: parseFloat(config.jwt.accessTokenExpiresIn),
  });
};

const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, config.jwt.refreshTokenSecret, {
    expiresIn: parseFloat(config.jwt.refreshTokenExpiresIn),
  });
};

export const saveRefreshToken = async (userId: string, token: string) => {
  const decoded = jwt.decode(token) as JwtPayload;
  const expiresAt = new Date(decoded?.exp ?? 0 * 1000);
  const refreshToken = refreshTokenRepository.create({
    userId,
    token,
    expiresAt,
  });
  return await refreshTokenRepository.save(refreshToken);
};

export const generateTokens = (userId: string) => {
  const accessToken = generateAccessToken({ userId });
  const refreshToken = generateRefreshToken({ userId });
  return {
    accessToken,
    refreshToken,
  };
};

export const findToken = async (token: string): Promise<boolean> => {
  const tokenData = await refreshTokenRepository.findOne({ where: { token } });
  return Boolean(tokenData);
};

export const validateAccessToken = (token: string) => {
  const payload = jwt.verify(token, config.jwt.accessTokenSecret);
  return payload;
};

export const validateRefreshToken = (token: string) => {
  const payload = jwt.verify(token, config.jwt.refreshTokenSecret);
  return payload;
};

export const removeToken = async (refreshToken: string) => {
  const tokenData = await refreshTokenRepository.delete({
    token: refreshToken,
  });
  return tokenData;
};
