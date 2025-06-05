import { IBase } from "./base.interface";

interface IClinic extends IBase {
    _id: string;
    name: string;
    doctors: string[];
}

type IClinicCreateDTO = Pick<IClinic, "name">;

export type { IClinic, IClinicCreateDTO };
