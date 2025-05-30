import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUserCreateDTO, IUserSignInDTO } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { authService } from "../services/auth.service";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

class AuthController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as IUserCreateDTO;
            const data = await authService.signUp(body);

            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IUserSignInDTO;
            const data = await authService.signIn(dto);

            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async me(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPayload = res.locals.tokenPayload as ITokenPayload;
            const { userId } = tokenPayload;
            const user = await userService.getById(userId);

            res.status(StatusCodesEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, role } = req.res.locals.tokenPayload as ITokenPayload;
            const newTokens = tokenService.generateTokens({ userId, role });
            await tokenRepository.create({ ...newTokens, _userId: userId });

            res.status(StatusCodesEnum.OK).json({ tokens: newTokens });
        } catch (e) {
            next(e);
        }
    }

    public async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.params;
            const user = await authService.activate(token);

            res.status(StatusCodesEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    }

    public async passwordRecoveryRequest(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const user = await userService.getByEmail(email);
            if (user) {
                await authService.passwordRecoveryRequest(user);
            }

            res.status(StatusCodesEnum.OK).json({ details: "Check your email" });
        } catch (e) {
            next(e);
        }
    }

    public async recoveryPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.params;
            const { password } = req.body;
            const user = await authService.recoveryPassword(token, password);

            res.status(StatusCodesEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
