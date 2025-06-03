import { IBase } from "./base.interface";
import { IClinic } from "./clinic.interface";
import { IMedicalSpeciality } from "./medical-speciality.interface";

interface IDoctor extends IBase {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    clinics: IClinic[] | string[];
    specialties: IMedicalSpeciality[] | string[];
}

type IDoctorCreateDTO = Pick<IDoctor, "firstName" | "lastName" | "phone" | "email">;

export type { IDoctor, IDoctorCreateDTO };
