import { model, Schema, Types } from "mongoose";

import { IClinic } from "../interfaces/clinic.interface";

const clinicSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        doctors: [{ type: Types.ObjectId, ref: "doctor" }],
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Clinic = model<IClinic>("clinic", clinicSchema);
