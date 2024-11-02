import { Request, Response } from 'express';
import { asyncHandler } from '@/middlewares';
import { authService } from '@/services';
import { AuthUserDTO } from '@/dto';
import { validateOrError } from '@/utils';
import { config } from '@/config/env';

export const registration = asyncHandler(
  async (req: Request, res: Response) => {
    const authUser = new AuthUserDTO(req.body);
    await validateOrError(authUser);

    const user = await authService.registration(req.body);
    res.status(201).json(user);
  }
);

export const login = asyncHandler(async (req: Request, res: Response) => {
  const authUser = new AuthUserDTO(req.body);
  await validateOrError(authUser);

  const loginData = await authService.login(authUser);

  res.cookie('refreshToken', loginData.refreshToken, {
    maxAge: parseFloat(config.jwt.refreshTokenExpiresIn) * 1000,
    httpOnly: true,
  });
  res.json(loginData);
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies ?? {};
  const tokens = await authService.refresh(refreshToken ?? '');

  res.cookie('refreshToken', tokens.refreshToken, {
    maxAge: parseFloat(config.jwt.refreshTokenExpiresIn) * 1000,
    httpOnly: true,
  });
  res.json(tokens);
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  await authService.logout(refreshToken);

  res.clearCookie('refreshToken');
  return res.status(204).send();
});
