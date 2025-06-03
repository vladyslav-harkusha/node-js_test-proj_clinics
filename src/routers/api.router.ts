import { Router } from "express";

import { authRouter } from "./auth.router";
import { medicalSpecialityRouter } from "./medical-speciality.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/specialities", medicalSpecialityRouter);

export const apiRouter = router;
