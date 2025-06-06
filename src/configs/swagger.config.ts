import { OpenAPIV3 } from "openapi-types";
import swaggerUI from "swagger-ui-express";

const swaggerDocument: OpenAPIV3.Document = {
    openapi: "3.0.0",
    info: {
        title: "Clinics Test API Documentation",
        version: "1.0.0",
        description: "API documentation for Clinics, Doctors and Medical specialties",
    },
    servers: [
        {
            url: "http://localhost:7000",
            description: "Local server",
        },
    ],
    tags: [
        {
            name: "Auth",
            description: "Authentication endpoints",
        },
        {
            name: "Users",
            description: "Users endpoints",
        },
        {
            name: "Clinics",
            description: "Clinics endpoints",
        },
        {
            name: "Doctors",
            description: "Doctors endpoints",
        },
        {
            name: "Medical specialties",
            description: "Medical specialties endpoints",
        },
    ],
    paths: {},
};

export { swaggerDocument, swaggerUI };
