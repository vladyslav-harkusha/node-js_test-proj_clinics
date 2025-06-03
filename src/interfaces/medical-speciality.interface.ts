import { IBase } from "./base.interface";

interface IMedicalSpeciality extends IBase {
    _id: string;
    name: string;
}

type IMedicalSpecialityCreateDTO = Pick<IMedicalSpeciality, "name">;

export type { IMedicalSpeciality, IMedicalSpecialityCreateDTO };
