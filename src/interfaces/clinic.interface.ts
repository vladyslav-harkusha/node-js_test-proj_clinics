import { IBase } from "./base.interface";
import { IDoctor } from "./doctor.interface";

interface IClinic extends IBase {
    _id: string;
    name: string;
    doctors: IDoctor[] | string[];
}

type IClinicCreateDTO = Pick<IClinic, "name">;

export type { IClinic, IClinicCreateDTO };
