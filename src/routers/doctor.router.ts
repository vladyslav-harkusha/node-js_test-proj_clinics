import { Router } from "express";

import { doctorController } from "../controllers/doctor.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { DoctorValidator } from "../validators/doctor.validator";
import { QueryParamsValidator } from "../validators/query-params.validator";

const router = Router();

router.get("/", commonMiddleware.query(QueryParamsValidator.query), doctorController.getAll);
router.get("/:id", commonMiddleware.isIdValid("id"), doctorController.getById);
router.post(
    "/",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.validateBody(DoctorValidator.create),
    doctorController.create,
);
router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(DoctorValidator.update),
    doctorController.updateById,
);
router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValid("id"),
    doctorController.deleteById,
);
router.patch(
    "/:id/clinics",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValid("id"),
    doctorController.addClinic,
);
router.patch(
    "/:id/clinics/:clinicId",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValid("id"),
    commonMiddleware.isIdValid("clinicId"),
    doctorController.removeClinic,
);
router.patch(
    "/:id/specialties",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValid("id"),
    doctorController.addSpecialty,
);
router.patch(
    "/:id/specialties/:specialtyId",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValid("id"),
    commonMiddleware.isIdValid("specialtyId"),
    doctorController.removeSpecialty,
);

export const doctorRouter = router;
