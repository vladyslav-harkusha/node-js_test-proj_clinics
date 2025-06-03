import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import {
    IMedicalSpeciality,
    IMedicalSpecialityCreateDTO,
} from "../interfaces/medical-speciality.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { IQueryParams } from "../interfaces/query-params.interface";
import { medicalSpecialityRepository } from "../repositories/medical-speciality.repository";

class MedicalSpecialityService {
    public async getAll(query: IQueryParams): Promise<IPaginatedResponse<IMedicalSpeciality>> {
        const [data, totalItems] = await medicalSpecialityRepository.getAll(query);

        const totalPages = Math.ceil(totalItems / query.pageSize);

        return {
            totalItems,
            totalPages,
            prevPage: !!(query.page - 1),
            nextPage: query.page + 1 <= totalPages,
            data,
        };
    }

    public async create(medSpec: IMedicalSpecialityCreateDTO): Promise<IMedicalSpeciality> {
        await medicalSpecialityService.isMedSpecialityUnique(medSpec.name);

        return await medicalSpecialityRepository.create(medSpec);
    }

    public async getById(medSpecId: string): Promise<IMedicalSpeciality> {
        const medSpec = await medicalSpecialityRepository.getById(medSpecId);

        if (!medSpec) {
            throw new ApiError("Medical speciality not found", StatusCodesEnum.NOT_FOUND);
        }

        return medSpec;
    }

    public async updateById(
        medSpecId: string,
        updateData: Partial<IMedicalSpeciality>,
    ): Promise<IMedicalSpeciality> {
        const medSpec = await medicalSpecialityRepository.getById(medSpecId);

        if (!medSpec) {
            throw new ApiError("Medical speciality not found", StatusCodesEnum.NOT_FOUND);
        }

        return await medicalSpecialityRepository.updateById(medSpecId, updateData);
    }

    public async deleteById(medSpecId: string): Promise<void> {
        const medSpec = await medicalSpecialityRepository.getById(medSpecId);

        if (!medSpec) {
            throw new ApiError("Medical speciality not found", StatusCodesEnum.NOT_FOUND);
        }

        await medicalSpecialityRepository.deleteById(medSpecId);
    }

    public async isMedSpecialityUnique(name: string): Promise<void> {
        const medSpec = await medicalSpecialityRepository.getByName(name);

        if (medSpec) {
            throw new ApiError("Medical speciality is already exists", StatusCodesEnum.BAD_REQUEST);
        }
    }
}

export const medicalSpecialityService = new MedicalSpecialityService();
