import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IDoctor, IDoctorCreateDTO } from "../interfaces/doctor.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { IQueryParams } from "../interfaces/query-params.interface";
import { clinicRepository } from "../repositories/clinic.repository";
import { doctorRepository } from "../repositories/doctor.repository";
import { medicalSpecialityRepository } from "../repositories/medical-speciality.repository";

class DoctorService {
    public async getAll(query: IQueryParams): Promise<IPaginatedResponse<IDoctor>> {
        const [data, totalItems] = await doctorRepository.getAll(query);
        const totalPages = Math.ceil(totalItems / query.pageSize);

        return {
            totalItems,
            totalPages,
            prevPage: !!(query.page - 1),
            nextPage: query.page + 1 <= totalPages,
            data,
        };
    }

    public async create(doctor: IDoctorCreateDTO): Promise<IDoctor> {
        await doctorService.isDoctorUnique(doctor.email);

        return await doctorRepository.create(doctor);
    }

    public async getById(doctorId: string): Promise<IDoctor> {
        const doctor = await doctorRepository.getById(doctorId);
        if (!doctor) {
            throw new ApiError("Doctor not found", StatusCodesEnum.NOT_FOUND);
        }

        return doctor;
    }

    public async updateById(doctorId: string, updateData: Partial<IDoctor>): Promise<IDoctor> {
        const doctor = await doctorRepository.getById(doctorId);
        if (!doctor) {
            throw new ApiError("Doctor not found", StatusCodesEnum.NOT_FOUND);
        }

        return await doctorRepository.updateById(doctorId, updateData);
    }

    public async deleteById(doctorId: string): Promise<void> {
        const doctor = await doctorRepository.getById(doctorId);
        if (!doctor) {
            throw new ApiError("Doctor not found", StatusCodesEnum.NOT_FOUND);
        }

        await doctorRepository.deleteById(doctorId);
    }

    public async isDoctorUnique(email: string): Promise<void> {
        const doctor = await doctorRepository.getByEmail(email);
        if (doctor) {
            throw new ApiError("Doctor is already exists", StatusCodesEnum.BAD_REQUEST);
        }
    }

    public async addClinic(doctorId: string, clinicId: string): Promise<IDoctor> {
        const doctor = await doctorRepository.getById(doctorId);
        const clinic = await clinicRepository.getById(clinicId);

        if (!doctor) {
            throw new ApiError("Doctor not found", StatusCodesEnum.NOT_FOUND);
        }
        if (!clinic) {
            throw new ApiError("Clinic not found", StatusCodesEnum.NOT_FOUND);
        }

        if (doctor.clinics.includes(clinicId)) {
            throw new ApiError(
                `Clinic with ID=${clinicId} is already exists in current doctor`,
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        await clinicRepository.addDoctor(clinicId, doctorId);

        return await doctorRepository.addClinic(doctorId, clinicId);
    }

    public async removeClinic(doctorId: string, clinicId: string): Promise<IDoctor> {
        const doctor = await doctorRepository.getById(doctorId);
        const clinic = await clinicRepository.getById(clinicId);

        if (!doctor) {
            throw new ApiError("Doctor not found", StatusCodesEnum.NOT_FOUND);
        }
        if (!clinic) {
            throw new ApiError("Clinic not found", StatusCodesEnum.NOT_FOUND);
        }

        if (!doctor.clinics.includes(clinicId)) {
            throw new ApiError(
                `Clinic with ID=${doctorId} not found in current doctor`,
                StatusCodesEnum.NOT_FOUND,
            );
        }

        await clinicRepository.removeDoctor(clinicId, doctorId);

        return await doctorRepository.removeClinic(doctorId, clinicId);
    }

    public async addSpecialty(doctorId: string, specialtyId: string): Promise<IDoctor> {
        const doctor = await doctorRepository.getById(doctorId);
        const specialty = await medicalSpecialityRepository.getById(specialtyId);

        if (!doctor) {
            throw new ApiError("Doctor not found", StatusCodesEnum.NOT_FOUND);
        }
        if (!specialty) {
            throw new ApiError("Specialty not found", StatusCodesEnum.NOT_FOUND);
        }

        if (doctor.specialties.includes(specialtyId)) {
            throw new ApiError(
                `This doctor already has a speciality with ID=${specialtyId}`,
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        return await doctorRepository.addSpecialty(doctorId, specialtyId);
    }

    public async removeSpecialty(doctorId: string, specialtyId: string): Promise<IDoctor> {
        const doctor = await doctorRepository.getById(doctorId);
        const specialty = await medicalSpecialityRepository.getById(specialtyId);

        if (!doctor) {
            throw new ApiError("Doctor not found", StatusCodesEnum.NOT_FOUND);
        }
        if (!specialty) {
            throw new ApiError("Specialty not found", StatusCodesEnum.NOT_FOUND);
        }

        if (doctor.specialties.includes(specialtyId)) {
            throw new ApiError(
                `This doctor does not have a speciality with ID=${specialtyId}`,
                StatusCodesEnum.NOT_FOUND,
            );
        }

        return await doctorRepository.removeSpecialty(doctorId, specialtyId);
    }
}

export const doctorService = new DoctorService();
