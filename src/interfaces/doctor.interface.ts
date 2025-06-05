import { IBase } from "./base.interface";

interface IDoctor extends IBase {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    clinics: string[];
    specialties: string[];
}

type IDoctorCreateDTO = Pick<IDoctor, "firstName" | "lastName" | "phone" | "email">;

export type { IDoctor, IDoctorCreateDTO };
