import { Router } from "express";

import { upload } from "../configs/multer.config";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { QueryParamsValidator } from "../validators/query-params.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", commonMiddleware.query(QueryParamsValidator.query), userController.getAll);
router.get("/:id", commonMiddleware.isIdValid("id"), userController.getById);
router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(UserValidator.update),
    userController.updateById,
);
router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("id"),
    userController.deleteById,
);
router.patch(
    "/:id/block",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    userController.blockUser,
);
router.patch(
    "/:id/unblock",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    userController.unBlockUser,
);

router.patch(
    "/upload-avatar/:id",
    authMiddleware.checkAccessToken,
    upload.single("avatar"),
    commonMiddleware.isFileExists(),
    userController.uploadAvatar,
);

export const userRouter = router;
