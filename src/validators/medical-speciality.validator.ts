import joi from "joi";

export class MedicalSpecialityValidator {
    private static name = joi.string().min(2).max(255).trim();

    public static create = joi.object({
        name: this.name.required(),
    });

    public static update = joi.object({
        name: this.name.required(),
    });
}
