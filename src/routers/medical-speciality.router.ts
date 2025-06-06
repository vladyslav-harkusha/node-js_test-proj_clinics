import { Router } from "express";

import { medicalSpecialityController } from "../controllers/medical-speciality.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { MedicalSpecialityValidator } from "../validators/medical-speciality.validator";
import { QueryParamsValidator } from "../validators/query-params.validator";

const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.query(QueryParamsValidator.query),
    medicalSpecialityController.getAll,
);
router.get(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("id"),
    medicalSpecialityController.getById,
);
router.post(
    "/",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.validateBody(MedicalSpecialityValidator.create),
    medicalSpecialityController.create,
);
router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(MedicalSpecialityValidator.update),
    medicalSpecialityController.updateById,
);
router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValid("id"),
    medicalSpecialityController.deleteById,
);

export const medicalSpecialityRouter = router;
