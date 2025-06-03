import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IClinic, IClinicCreateDTO } from "../interfaces/clinic.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { IQueryParams } from "../interfaces/query-params.interface";
import { clinicRepository } from "../repositories/clinic.repository";

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
}

export const clinicService = new ClinicService();
