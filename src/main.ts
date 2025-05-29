/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

import path from "node:path";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

// import { config } from "./configs/config";
// import { cronRunner } from "./crons";
import { ApiError } from "./errors/api.error";
import { apiRouter } from "./routers/api.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use("/media", express.static(path.join(process.cwd(), "upload")));

app.use("/", apiRouter);

app.use("*", (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message ?? "Something went wrong";
    res.status(status).json({ status, message });
});

process.on("uncaughtException", (err) => {
    console.log("uncaughtException", err);
    process.exit(1);
});

const dbConnection = async () => {
    let dbCon = false;

    while (!dbCon) {
        try {
            console.log("Connecting to DB...");
            // console.log(config.MONGO_URI);
            await mongoose.connect(
                "mongodb+srv://admin1:admin1Pass@cluster0.je8wp.mongodb.net/nodejs-test-db",
            );
            dbCon = true;
            console.log("Database available!!!");
        } catch (e) {
            console.log("Database unavailable, wait 3 seconds");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};

const start = async () => {
    try {
        await dbConnection();
        app.listen(7000, async () => {
            console.log(`Server is listening on ${7000}`);
            // await cronRunner();
        });
    } catch (e) {
        console.log(e);
    }
};

start();
