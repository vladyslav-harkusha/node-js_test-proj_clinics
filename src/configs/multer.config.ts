import path from "node:path";

import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { v6 } from "uuid";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "upload"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = v6();
        const ext = path.extname(file.originalname);

        cb(null, `${uniqueSuffix}${ext}`);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedExtensions = /.jpg|.jpeg|.png|.gif/;
    const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const minetype = allowedExtensions.test(file.mimetype);

    if (extName && minetype) {
        return cb(null, true);
    } else {
        cb(new ApiError("Only image extensions are allowed", StatusCodesEnum.BAD_REQUEST));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 mb
    fileFilter: fileFilter,
});

export { upload };
