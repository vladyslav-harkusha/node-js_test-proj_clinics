import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AuthValidator } from "../validators/auth.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post("/sign-up", commonMiddleware.validateBody(UserValidator.create), authController.signUp);
router.post("/sign-in", authController.signIn);
router.post(
    "/refresh",
    commonMiddleware.validateBody(AuthValidator.refreshToken),
    authMiddleware.checkRefreshToken,
    authController.refresh,
);
router.get("/me", authMiddleware.checkAccessToken, authController.me);
router.patch("/verify/:token", authController.verifyAccount);
router.post(
    "/recovery",
    commonMiddleware.validateBody(AuthValidator.recoveryEmail),
    authController.passwordRecoveryRequest,
);
router.post(
    "/recovery/:token",
    commonMiddleware.validateBody(AuthValidator.validatePassword),
    authController.recoveryPassword,
);

export const authRouter = router;
