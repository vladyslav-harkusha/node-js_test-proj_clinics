import { config } from "../configs/config";
import { emailConstants } from "../constants/email.constants";
import { ActionTokenTypeEnum } from "../enums/action-token-type-enum";
import { EmailEnum } from "../enums/email.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser, IUserCreateDTO, IUserSignInDTO } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
    public async signUp(user: IUserCreateDTO): Promise<{ user: IUser; tokens: ITokenPair }> {
        await userService.isEmailUnique(user.email);

        const password = await passwordService.hashPassword(user.password);
        const newUser = await userRepository.create({ ...user, password });
        const tokens = tokenService.generateTokens({
            userId: newUser._id,
            role: newUser.role,
        });
        await tokenRepository.create({ ...tokens, _userId: newUser._id });

        const token = tokenService.generateActionToken(
            { userId: newUser._id, role: newUser.role },
            ActionTokenTypeEnum.ACTIVATE,
        );
        await emailService.sendEmail(newUser.email, emailConstants[EmailEnum.ACTIVATE], {
            name: newUser.name,
            url: `${config.FRONTEND_URL}/activate/${token}`,
        });

        return { user: newUser, tokens };
    }

    public async signIn(dto: IUserSignInDTO): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email);
        if (!user) {
            throw new ApiError("Email or password invalid", StatusCodesEnum.UNAUTHORIZED);
        }

        const isValidPassword = await passwordService.comparePassword(dto.password, user.password);

        if (!isValidPassword) {
            throw new ApiError("Invalid email or password", StatusCodesEnum.UNAUTHORIZED);
        }

        if (!user.isVerified) {
            throw new ApiError("Account is not verified", StatusCodesEnum.UNAUTHORIZED);
        }

        if (user.isBlocked) {
            throw new ApiError("Account was blocked by admin", StatusCodesEnum.FORBIDDEN);
        }

        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokens, _userId: user._id });

        return { user, tokens };
    }

    public async verifyAccount(token: string): Promise<IUser> {
        const { userId } = tokenService.verifyToken(token, ActionTokenTypeEnum.ACTIVATE);

        return await userService.updateById(userId, { isVerified: true });
    }

    public async passwordRecoveryRequest(user: IUser): Promise<void> {
        const token = tokenService.generateActionToken(
            { userId: user._id, role: user.role },
            ActionTokenTypeEnum.RECOVERY,
        );
        const url = `${config.FRONTEND_URL}/recovery/${token}`;
        await emailService.sendEmail(user.email, emailConstants[EmailEnum.RECOVERY], { url });
    }

    public async recoveryPassword(token: string, password: string): Promise<IUser> {
        const { userId } = tokenService.verifyToken(token, ActionTokenTypeEnum.RECOVERY);
        const hashedPassword = await passwordService.hashPassword(password);

        return await userService.updateById(userId, { password: hashedPassword });
    }
}

export const authService = new AuthService();
