import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class UserValidator {
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);
    private static name = joi.string().pattern(RegexEnum.NAME);
    private static surname = joi.string().pattern(RegexEnum.NAME);
    private static age = joi.number().min(1).max(100);

    public static create = joi.object({
        email: this.email.required(),
        password: this.password.required(),
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });

    public static update = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });
}
