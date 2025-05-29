import { RoleEnum } from "../enums/role.enum";
import { IBase } from "./base.interface";

interface IUser extends IBase {
    _id: string;
    email: string;
    password: string;
    role: RoleEnum;
    name: string;
    surname: string;
    age: number;
    avatar: string;
    isActive: boolean;
    isDeleted: boolean;
    isVerified: boolean;
}

interface IUserQuery {
    pageSize: number;
    page: number;
    search?: string;
    order?: string;
}

type IUserCreateDTO = Pick<IUser, "email" | "password" | "name" | "surname" | "age">;
type IUserUpdateDTO = Pick<IUser, "name" | "surname" | "age">;
type IUserSignInDTO = Pick<IUser, "email" | "password">;

export type { IUser, IUserCreateDTO, IUserQuery, IUserSignInDTO, IUserUpdateDTO };
