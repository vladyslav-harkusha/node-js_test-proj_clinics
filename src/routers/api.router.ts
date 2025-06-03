import { Router } from "express";

import { authRouter } from "./auth.router";
import { clinicRouter } from "./clinic.router";
import { doctorRouter } from "./doctor.router";
import { medicalSpecialityRouter } from "./medical-speciality.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/clinics", clinicRouter);
router.use("/doctors", doctorRouter);
router.use("/specialties", medicalSpecialityRouter);

export const apiRouter = router;
