import { NextFunction, Request, Response } from "express";

import { RoleEnum } from "../enums/role.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { IRefresh, ITokenPayload } from "../interfaces/token.interface";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

class AuthMiddleware {
    public async checkAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                throw new ApiError("No access token provided", StatusCodesEnum.UNAUTHORIZED);
            }

            const accessToken = authorizationHeader.split(" ")[1];
            if (!accessToken) {
                throw new ApiError("No access token provided", StatusCodesEnum.UNAUTHORIZED);
            }

            const isTokenExist = await tokenService.isTokenExists(
                accessToken,
                TokenTypeEnum.ACCESS,
            );
            if (!isTokenExist) {
                throw new ApiError("Invalid access token", StatusCodesEnum.UNAUTHORIZED);
            }

            const tokenPayload = tokenService.verifyToken(accessToken, TokenTypeEnum.ACCESS);

            const isActive = await userService.isActive(tokenPayload.userId);
            if (!isActive) {
                throw new ApiError("Account is not active", StatusCodesEnum.FORBIDDEN);
            }

            req.res.locals.tokenPayload = tokenPayload; // temporary vars

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body as IRefresh;
            if (!refreshToken) {
                throw new ApiError("No refresh token provided", StatusCodesEnum.FORBIDDEN);
            }

            const isTokenExist = await tokenService.isTokenExists(
                refreshToken,
                TokenTypeEnum.REFRESH,
            );
            if (!isTokenExist) {
                throw new ApiError("Invalid refresh token", StatusCodesEnum.FORBIDDEN);
            }

            const tokenPayload = tokenService.verifyToken(refreshToken, TokenTypeEnum.REFRESH);
            req.res.locals.tokenPayload = tokenPayload; // temporary vars

            next();
        } catch (e) {
            next(e);
        }
    }

    public isAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { role } = req.res.locals.tokenPayload as ITokenPayload;
            if (role !== RoleEnum.ADMIN) {
                throw new ApiError("Has no permissions", StatusCodesEnum.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
