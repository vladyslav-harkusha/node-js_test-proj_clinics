import { Router } from "express";

import { clinicController } from "../controllers/clinic.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { ClinicValidator } from "../validators/clinic.validator";
import { QueryParamsValidator } from "../validators/query-params.validator";

const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.query(QueryParamsValidator.query),
    clinicController.getAll,
);
router.post(
    "/",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.validateBody(ClinicValidator.create),
    clinicController.create,
);
router.get(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("id"),
    clinicController.getById,
);
router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(ClinicValidator.update),
    clinicController.updateById,
);
router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValid("id"),
    clinicController.deleteById,
);
router.patch(
    "/:id/doctors",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValid("id"),
    clinicController.addDoctor,
);
router.patch(
    "/:id/doctors/:doctorId",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValid("id"),
    commonMiddleware.isIdValid("doctorId"),
    clinicController.removeDoctor,
);

export const clinicRouter = router;
