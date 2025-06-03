import { model, Schema } from "mongoose";

import { IMedicalSpeciality } from "../interfaces/medical-speciality.interface";

const medicalSpecialitySchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const MedicalSpeciality = model<IMedicalSpeciality>(
    "medical-speciality",
    medicalSpecialitySchema,
);
