import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IClinic, IClinicCreateDTO } from "../interfaces/clinic.interface";
import { IMedicalSpeciality } from "../interfaces/medical-speciality.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { IQueryParams } from "../interfaces/query-params.interface";
import { Clinic } from "../models/clinic.model";
import { clinicRepository } from "../repositories/clinic.repository";
import { doctorRepository } from "../repositories/doctor.repository";
import { medicalSpecialityRepository } from "../repositories/medical-speciality.repository";

class ClinicService {
    public async getAll(query: IQueryParams): Promise<IPaginatedResponse<IClinic>> {
        const [data, totalItems] = await clinicRepository.getAll(query);

        const totalPages = Math.ceil(totalItems / query.pageSize);

        return {
            totalItems,
            totalPages,
            prevPage: !!(query.page - 1),
            nextPage: query.page + 1 <= totalPages,
            data,
        };
    }

    public async create(clinic: IClinicCreateDTO): Promise<IClinic> {
        await clinicService.isClinicUnique(clinic.name);

        return await clinicRepository.create(clinic);
    }

    public async getById(clinicId: string): Promise<IClinic> {
        const clinic = await clinicRepository.getById(clinicId);

        if (!clinic) {
            throw new ApiError("Clinic not found", StatusCodesEnum.NOT_FOUND);
        }

        return clinic;
    }

    public async updateById(clinicId: string, updateData: Partial<IClinic>): Promise<IClinic> {
        const clinic = await clinicRepository.getById(clinicId);

        if (!clinic) {
            throw new ApiError("Clinic not found", StatusCodesEnum.NOT_FOUND);
        }

        return await clinicRepository.updateById(clinicId, updateData);
    }

    public async deleteById(clinicId: string): Promise<void> {
        const clinic = await clinicRepository.getById(clinicId);

        if (!clinic) {
            throw new ApiError("Clinic not found", StatusCodesEnum.NOT_FOUND);
        }

        await clinicRepository.deleteById(clinicId);
    }

    public async isClinicUnique(name: string): Promise<void> {
        const clinic = await clinicRepository.getByName(name);

        if (clinic) {
            throw new ApiError("Clinic is already exists", StatusCodesEnum.BAD_REQUEST);
        }
    }

    public async getClinicSpecialties(clinicId: string): Promise<IMedicalSpeciality[]> {
        const clinic = await Clinic.findById(clinicId).populate("doctors");

        if (!clinic) {
            throw new ApiError("Clinic not found", StatusCodesEnum.NOT_FOUND);
        }

        const allSpecialtyIds = clinic.doctors.flatMap((doctor: any) => doctor.specialties);
        const uniqueIds = [...new Set(allSpecialtyIds)];

        return await medicalSpecialityRepository.getByIds(uniqueIds);
    }

    public async addDoctor(clinicId: string, doctorId: string): Promise<IClinic> {
        const clinic = await clinicRepository.getById(clinicId);
        const doctor = await doctorRepository.getById(doctorId);

        if (!clinic) {
            throw new ApiError("Clinic not found", StatusCodesEnum.NOT_FOUND);
        }
        if (!doctor) {
            throw new ApiError("Doctor not found", StatusCodesEnum.NOT_FOUND);
        }

        if (clinic.doctors.includes(doctorId)) {
            throw new ApiError(
                `Doctor with ID=${doctorId} is already exists in current clinic`,
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        await doctorRepository.addClinic(doctorId, clinicId);

        return await clinicRepository.addDoctor(clinicId, doctorId);
    }

    public async removeDoctor(clinicId: string, doctorId: string): Promise<IClinic> {
        const clinic = await clinicRepository.getById(clinicId);
        const doctor = await doctorRepository.getById(doctorId);

        if (!clinic) {
            throw new ApiError("Clinic not found", StatusCodesEnum.NOT_FOUND);
        }
        if (!doctor) {
            throw new ApiError("Doctor not found", StatusCodesEnum.NOT_FOUND);
        }

        if (!clinic.doctors.includes(doctorId)) {
            throw new ApiError(
                `Doctor with ID=${doctorId} not found in current clinic`,
                StatusCodesEnum.NOT_FOUND,
            );
        }

        await doctorRepository.removeClinic(doctorId, clinicId);

        return await clinicRepository.removeDoctor(clinicId, doctorId);
    }
}

export const clinicService = new ClinicService();
