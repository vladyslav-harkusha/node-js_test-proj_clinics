import { FilterQuery } from "mongoose";

import { IClinic, IClinicCreateDTO } from "../interfaces/clinic.interface";
import { IQueryParams } from "../interfaces/query-params.interface";
import { Clinic } from "../models/clinic.model";
import { Doctor } from "../models/doctor.model";

class ClinicRepository {
    public async getAll(query: IQueryParams): Promise<[IClinic[], number]> {
        const skip = query.pageSize * (query.page - 1);
        const filterObject: FilterQuery<IClinic> = {};

        if (query.search) {
            filterObject.name = { $regex: query.search, $options: "i" };
        }

        if (query.doctorId) {
            filterObject.doctors = query.doctorId;
        }

        if (query.specialtyId) {
            const doctors = await Doctor.find({ specialties: query.specialtyId }, "_id");
            const doctorIds = doctors.map((doc) => doc._id);
            filterObject.doctors = { $in: doctorIds };
        }

        return await Promise.all([
            Clinic.find(filterObject)
                .limit(query.pageSize)
                .skip(skip)
                .sort(query.order)
                .populate("doctors"),
            Clinic.find(filterObject).countDocuments(),
        ]);
    }

    public create(clinic: IClinicCreateDTO): Promise<IClinic> {
        return Clinic.create(clinic);
    }

    public getById(clinic: string): Promise<IClinic> {
        return Clinic.findById(clinic);
    }

    public updateById(clinicId: string, newClinic: Partial<IClinic>): Promise<IClinic> {
        return Clinic.findByIdAndUpdate(clinicId, newClinic, { new: true });
    }

    public deleteById(clinicId: string) {
        return Clinic.findByIdAndDelete(clinicId);
    }

    public getByName(name: string): Promise<IClinic> {
        return Clinic.findOne({ name });
    }

    public addDoctor(clinicId: string, doctorId: string): Promise<IClinic> {
        return Clinic.findByIdAndUpdate(
            clinicId,
            { $addToSet: { doctors: doctorId } },
            { new: true },
        ).populate("doctors");
    }

    public removeDoctor(clinicId: string, doctorId: string): Promise<IClinic> {
        return Clinic.findByIdAndUpdate(
            clinicId,
            { $pull: { doctors: doctorId } },
            { new: true },
        ).populate("doctors");
    }
}

export const clinicRepository = new ClinicRepository();
