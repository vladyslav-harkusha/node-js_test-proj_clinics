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
    paths: {
        "/auth/sign-up": {
            post: {
                tags: ["Auth"],
                summary: "Register new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string", format: "email" },
                                    password: { type: "string", format: "password" },
                                    name: { type: "string" },
                                    surname: { type: "string" },
                                    age: { type: "integer" },
                                },
                                required: ["email", "password", "name", "surname", "age"],
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "User successfully registered",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            type: "object",
                                            properties: {
                                                email: { type: "string" },
                                                role: { type: "string", default: "user" },
                                                name: { type: "string" },
                                                surname: { type: "string" },
                                                age: { type: "number" },
                                                avatar: { type: "string" },
                                                isVerified: { type: "boolean", default: false },
                                                isBlocked: { type: "boolean", default: false },
                                                isDeleted: { type: "boolean", default: false },
                                                _id: { type: "string" },
                                                createdAt: { type: "string" },
                                                updatedAt: { type: "string" },
                                            },
                                        },
                                        tokens: {
                                            type: "object",
                                            properties: {
                                                accessToken: { type: "string" },
                                                refreshToken: { type: "string" },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "number", default: 400 },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/sign-in": {
            post: {
                tags: ["Auth"],
                summary: "Login user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string", format: "email" },
                                    password: { type: "string", format: "password" },
                                },
                                required: ["email", "password"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "User successfully logged in",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            type: "object",
                                            properties: {
                                                email: { type: "string" },
                                                role: { type: "string" },
                                                name: { type: "string" },
                                                surname: { type: "string" },
                                                age: { type: "number" },
                                                avatar: { type: "string" },
                                                isVerified: { type: "boolean", default: true },
                                                isBlocked: { type: "boolean", default: false },
                                                isDeleted: { type: "boolean", default: false },
                                                _id: { type: "string" },
                                                createdAt: { type: "string" },
                                                updatedAt: { type: "string" },
                                            },
                                        },
                                        tokens: {
                                            type: "object",
                                            properties: {
                                                accessToken: { type: "string" },
                                                refreshToken: { type: "string" },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "number", default: 400 },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/me": {
            get: {
                tags: ["Auth"],
                summary: "Get current user",
                description: "Returns the currently authenticated user based on the access token.",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    "200": {
                        description: "User information retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: { type: "string" },
                                        role: { type: "string" },
                                        name: { type: "string" },
                                        surname: { type: "string" },
                                        age: { type: "number" },
                                        avatar: { type: "string" },
                                        isVerified: { type: "boolean", default: true },
                                        isBlocked: { type: "boolean", default: false },
                                        isDeleted: { type: "boolean", default: false },
                                        _id: { type: "string" },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized - token is missing or invalid",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "number", default: 401 },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/verify/{token}": {
            patch: {
                summary: "Verify email by token",
                tags: ["Auth"],
                parameters: [
                    {
                        name: "token",
                        in: "path",
                        required: true,
                        description: "Verification token",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Account verified successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: { type: "string" },
                                        role: { type: "string" },
                                        name: { type: "string" },
                                        surname: { type: "string" },
                                        age: { type: "number" },
                                        avatar: { type: "string" },
                                        isVerified: { type: "boolean", default: true },
                                        isBlocked: { type: "boolean", default: false },
                                        isDeleted: { type: "boolean", default: false },
                                        _id: { type: "string" },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized - token is missing or invalid",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "number", default: 401 },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/recovery": {
            post: {
                tags: ["Auth"],
                summary: "Password recovery request",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["email"],
                                properties: {
                                    email: {
                                        type: "string",
                                        format: "email",
                                        example: "user@example.com",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Recovery email sent",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        details: {
                                            type: "string",
                                            example: "Check your email",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Invalid input",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "Invalid email format",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/recovery/{token}": {
            patch: {
                tags: ["Auth"],
                summary: "Reset password by recovery token",
                parameters: [
                    {
                        name: "token",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                        description: "Recovery token from email",
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["password"],
                                properties: {
                                    password: {
                                        type: "string",
                                        example: "newPa$$word1",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Password successfully changed",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: { type: "string" },
                                        role: { type: "string" },
                                        name: { type: "string" },
                                        surname: { type: "string" },
                                        age: { type: "number" },
                                        avatar: { type: "string" },
                                        isVerified: { type: "boolean", default: true },
                                        isBlocked: { type: "boolean", default: false },
                                        isDeleted: { type: "boolean", default: false },
                                        _id: { type: "string" },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Invalid token or bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "number", default: 400 },
                                        message: {
                                            type: "string",
                                            example: "Invalid or expired token",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/users": {
            get: {
                summary: "Get all users",
                description: "Only for role admin",
                tags: ["Users"],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: "pageSize",
                        in: "query",
                        description: "Number of items per page",
                        schema: {
                            type: "integer",
                            example: 10,
                        },
                    },
                    {
                        name: "page",
                        in: "query",
                        description: "Page number",
                        schema: {
                            type: "integer",
                            example: 1,
                        },
                    },
                    {
                        name: "order",
                        in: "query",
                        description: "sortField or -sortField, asc or desc",
                        schema: {
                            type: "string",
                            example: "name",
                        },
                    },
                    {
                        name: "search",
                        in: "query",
                        description: "Search query",
                        schema: {
                            type: "string",
                            example: "gmail",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "List of all users (filtered and sorted)",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        totalItems: { type: "integer" },
                                        totalPages: { type: "integer" },
                                        prevPage: { type: "boolean" },
                                        nextPage: { type: "boolean" },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    email: { type: "string" },
                                                    role: { type: "string" },
                                                    name: { type: "string" },
                                                    surname: { type: "string" },
                                                    age: { type: "number" },
                                                    avatar: { type: "string" },
                                                    isVerified: { type: "boolean", default: true },
                                                    isBlocked: { type: "boolean", default: false },
                                                    isDeleted: { type: "boolean", default: false },
                                                    _id: { type: "string" },
                                                    createdAt: { type: "string" },
                                                    updatedAt: { type: "string" },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                    },
                    "403": {
                        description: "Access denied",
                    },
                },
            },
        },
        "/users/{id}": {
            get: {
                summary: "Get user by ID",
                description: "Only for role admin",
                tags: ["Users"],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "User ID",
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "User by ID",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: { type: "string" },
                                        role: { type: "string" },
                                        name: { type: "string" },
                                        surname: { type: "string" },
                                        age: { type: "number" },
                                        avatar: { type: "string" },
                                        isVerified: { type: "boolean", default: true },
                                        isBlocked: { type: "boolean", default: false },
                                        isDeleted: { type: "boolean", default: false },
                                        _id: { type: "string" },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                    },
                    "403": {
                        description: "Access denied",
                    },
                    "404": {
                        description: "User not found",
                    },
                },
            },
            put: {
                summary: "Update user by ID",
                description: "Only for role admin",
                tags: ["Users"],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "User ID",
                        schema: {
                            type: "string",
                        },
                    },
                ],
                requestBody: {
                    description: "Data transfer object",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    surname: { type: "string" },
                                    age: { type: "number" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "User updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: { type: "string" },
                                        role: { type: "string" },
                                        name: { type: "string" },
                                        surname: { type: "string" },
                                        age: { type: "number" },
                                        avatar: { type: "string" },
                                        isVerified: { type: "boolean", default: true },
                                        isBlocked: { type: "boolean", default: false },
                                        isDeleted: { type: "boolean", default: false },
                                        _id: { type: "string" },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                    },
                    "403": {
                        description: "Access denied",
                    },
                    "404": {
                        description: "User not found",
                    },
                },
            },
            delete: {
                summary: "Delete user by ID",
                description: "Only for role admin",
                tags: ["Users"],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "User ID",
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    "204": {
                        description: "User deleted, NO CONTENT",
                    },
                    "401": {
                        description: "Unauthorized",
                    },
                    "403": {
                        description: "Access denied",
                    },
                    "404": {
                        description: "User not found",
                    },
                },
            },
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
};

export { swaggerDocument, swaggerUI };
