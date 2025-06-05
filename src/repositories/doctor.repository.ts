import { FilterQuery } from "mongoose";

import { IDoctor, IDoctorCreateDTO } from "../interfaces/doctor.interface";
import { IQueryParams } from "../interfaces/query-params.interface";
import { Doctor } from "../models/doctor.model";

class DoctorRepository {
    public getAll(query: IQueryParams): Promise<[IDoctor[], number]> {
        const skip = query.pageSize * (query.page - 1);
        const filterObject: FilterQuery<IDoctor> = {};

        if (query.search) {
            filterObject.$or = [
                { firstName: { $regex: query.search, $options: "i" } },
                { lastName: { $regex: query.search, $options: "i" } },
                { phone: { $regex: query.search, $options: "i" } },
                { email: { $regex: query.search, $options: "i" } },
            ];
        }

        return Promise.all([
            Doctor.find(filterObject)
                .limit(query.pageSize)
                .skip(skip)
                .sort(query.order)
                .populate("clinics")
                .populate("specialties"),
            Doctor.find(filterObject).countDocuments(),
        ]);
    }

    public create(doctor: IDoctorCreateDTO): Promise<IDoctor> {
        return Doctor.create(doctor);
    }

    public getById(doctorId: string): Promise<IDoctor> {
        return Doctor.findById(doctorId);
    }

    public updateById(doctorId: string, newDoctor: Partial<IDoctor>): Promise<IDoctor> {
        return Doctor.findByIdAndUpdate(doctorId, newDoctor, { new: true });
    }

    public deleteById(doctorId: string) {
        return Doctor.findByIdAndDelete(doctorId);
    }

    public getByEmail(email: string): Promise<IDoctor> {
        return Doctor.findOne({ email });
    }

    public addClinic(doctorId: string, clinicId: string): Promise<IDoctor> {
        return Doctor.findByIdAndUpdate(
            doctorId,
            { $addToSet: { clinics: clinicId } },
            { new: true },
        ).populate("clinics");
    }

    public removeClinic(doctorId: string, clinicId: string): Promise<IDoctor> {
        return Doctor.findByIdAndUpdate(
            doctorId,
            { $pull: { clinics: clinicId } },
            { new: true },
        ).populate("clinics");
    }

    public addSpecialty(doctorId: string, specialtyId: string): Promise<IDoctor> {
        return Doctor.findByIdAndUpdate(
            doctorId,
            { $addToSet: { specialties: specialtyId } },
            { new: true },
        ).populate("specialties");
    }

    public removeSpecialty(doctorId: string, specialtyId: string): Promise<IDoctor> {
        return Doctor.findByIdAndUpdate(
            doctorId,
            { $pull: { specialties: specialtyId } },
            { new: true },
        ).populate("specialties");
    }
}

export const doctorRepository = new DoctorRepository();
