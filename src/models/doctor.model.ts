import { model, Schema, Types } from "mongoose";

import { IDoctor } from "../interfaces/doctor.interface";

const doctorSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        clinics: [{ type: Types.ObjectId, ref: "clinic" }],
        specialties: [{ type: Types.ObjectId, ref: "medical-speciality" }],
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Doctor = model<IDoctor>("doctor", doctorSchema);
