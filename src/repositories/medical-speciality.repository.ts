import { FilterQuery } from "mongoose";

import {
    IMedicalSpeciality,
    IMedicalSpecialityCreateDTO,
} from "../interfaces/medical-speciality.interface";
import { IQueryParams } from "../interfaces/query-params.interface";
import { MedicalSpeciality } from "../models/medical-speciality.model";

class MedicalSpecialityRepository {
    public getAll(query: IQueryParams): Promise<[IMedicalSpeciality[], number]> {
        const skip = query.pageSize * (query.page - 1);
        const filterObject: FilterQuery<IMedicalSpeciality> = {};

        if (query.search) {
            filterObject.name = { $regex: query.search, $options: "i" };
        }

        return Promise.all([
            MedicalSpeciality.find(filterObject).limit(query.pageSize).skip(skip).sort(query.order),
            MedicalSpeciality.find(filterObject).countDocuments(),
        ]);
    }

    public create(medSpec: IMedicalSpecialityCreateDTO): Promise<IMedicalSpeciality> {
        return MedicalSpeciality.create(medSpec);
    }

    public getById(medSpecId: string): Promise<IMedicalSpeciality> {
        return MedicalSpeciality.findById(medSpecId);
    }

    public getByIds(medSpecIds: string[]): Promise<IMedicalSpeciality[]> {
        return MedicalSpeciality.find({ _id: { $in: medSpecIds } });
    }

    public updateById(
        medSpecId: string,
        newMedSpec: Partial<IMedicalSpeciality>,
    ): Promise<IMedicalSpeciality> {
        return MedicalSpeciality.findByIdAndUpdate(medSpecId, newMedSpec, { new: true });
    }

    public deleteById(medSpecId: string) {
        return MedicalSpeciality.findByIdAndDelete(medSpecId);
    }

    public getByName(name: string): Promise<IMedicalSpeciality> {
        return MedicalSpeciality.findOne({ name });
    }
}

export const medicalSpecialityRepository = new MedicalSpecialityRepository();
