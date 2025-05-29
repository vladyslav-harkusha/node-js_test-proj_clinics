import { RoleEnum } from "../enums/role.enum";
import { IBase } from "./base.interface";

interface IToken extends IBase {
    _id: string;
    accessToken: string;
    refreshToken: string;
    _userId: string;
}

interface ITokenPayload {
    userId: string;
    role: RoleEnum;
}

type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;
type ITokenDTO = Pick<IToken, "accessToken" | "refreshToken" | "_userId">;
type IRefresh = Pick<IToken, "refreshToken">;

export { IRefresh, IToken, ITokenDTO, ITokenPair, ITokenPayload };
