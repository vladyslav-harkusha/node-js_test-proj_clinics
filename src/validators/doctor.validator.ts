import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class DoctorValidator {
    private static email = joi.string().email().trim();
    private static phone = joi.string().regex(RegexEnum.PHONE);
    private static firstName = joi.string().pattern(RegexEnum.NAME);
    private static lastName = joi.string().pattern(RegexEnum.NAME);

    public static create = joi.object({
        email: this.email.required(),
        phone: this.phone.required(),
        firstName: this.firstName.required(),
        lastName: this.lastName.required(),
    });

    public static update = joi.object({
        email: this.email,
        phone: this.phone,
        firstName: this.firstName,
        lastName: this.lastName,
    });
}
