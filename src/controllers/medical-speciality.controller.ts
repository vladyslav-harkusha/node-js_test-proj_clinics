import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import {
    IMedicalSpeciality,
    IMedicalSpecialityCreateDTO,
} from "../interfaces/medical-speciality.interface";
import { IQueryParams } from "../interfaces/query-params.interface";
import { medicalSpecialityService } from "../services/medical-speciality.service";

class MedicalSpecialityController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as any as IQueryParams;
            const data = await medicalSpecialityService.getAll(query);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await medicalSpecialityService.getById(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as IMedicalSpecialityCreateDTO;
            const data = await medicalSpecialityService.create(body);

            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const newMedSpec = req.body as Partial<IMedicalSpeciality>;
            const data = await medicalSpecialityService.updateById(id, newMedSpec);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await medicalSpecialityService.deleteById(id);
            res.status(StatusCodesEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
}

export const medicalSpecialityController = new MedicalSpecialityController();
