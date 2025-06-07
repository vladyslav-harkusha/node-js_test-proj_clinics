import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IClinic, IClinicCreateDTO } from "../interfaces/clinic.interface";
import { IQueryParams } from "../interfaces/query-params.interface";
import { clinicService } from "../services/clinic.service";

class ClinicController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as any as IQueryParams;
            const data = await clinicService.getAll(query);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await clinicService.getById(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as IClinicCreateDTO;
            const data = await clinicService.create(body);

            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const newMedSpec = req.body as Partial<IClinic>;
            const data = await clinicService.updateById(id, newMedSpec);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await clinicService.deleteById(id);
            res.status(StatusCodesEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }

    public async getClinicSpecialties(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await clinicService.getClinicSpecialties(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async addDoctor(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { doctorId } = req.body;
            const data = await clinicService.addDoctor(id, doctorId);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async removeDoctor(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { doctorId } = req.params;
            const data = await clinicService.removeDoctor(id, doctorId);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const clinicController = new ClinicController();
