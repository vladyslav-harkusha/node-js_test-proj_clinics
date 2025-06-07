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
            name: "Specialties",
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
        "/users/{id}/block": {
            patch: {
                summary: "Block user by ID",
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
                        description: "User blocked",
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
                                        isBlocked: { type: "boolean", default: true },
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
        },
        "/users/{id}/unblock": {
            patch: {
                summary: "Unblock user by ID",
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
                        description: "User unblocked",
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
        },
        "/clinics": {
            get: {
                summary: "Get list of clinics",
                description: "Only authorized users",
                tags: ["Clinics"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "doctorId",
                        in: "query",
                        description: "Filter clinics by doctorId",
                        schema: {
                            type: "string",
                            example: "683f259d8a88061a1232c074",
                        },
                    },
                    {
                        name: "specialtyId",
                        in: "query",
                        description: "Filter clinics by medical specialties",
                        schema: {
                            type: "string",
                            example: "683f259d8a88061a1232c074",
                        },
                    },
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
                        description: "All clinics by query params",
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
                                                    _id: { type: "string" },
                                                    name: { type: "string" },
                                                    doctors: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                _id: { type: "string" },
                                                                firstName: { type: "string" },
                                                                lastName: { type: "string" },
                                                                email: { type: "string" },
                                                                phone: { type: "string" },
                                                                clinics: {
                                                                    type: "array",
                                                                    items: { type: "string" },
                                                                },
                                                                specialties: {
                                                                    type: "array",
                                                                    items: { type: "string" },
                                                                },
                                                                createdAt: { type: "string" },
                                                                updatedAt: { type: "string" },
                                                            },
                                                        },
                                                    },
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
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                },
            },
            post: {
                summary: "Create a clinic",
                description: "Only role admin",
                tags: ["Clinics"],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    description: "Clinic data transfer object",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Create new clinic",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name: { type: "string" },
                                        doctors: { type: "array", items: { type: "string" } },
                                        _id: { type: "string" },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                },
            },
        },
        "/clinics/{id}/specialties": {
            get: {
                summary: "Get all specialties of clinic",
                description: "Only authorized users",
                tags: ["Clinics"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Clinic ID",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "All clinic specialties",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            _id: { type: "string" },
                                            name: { type: "string" },
                                            createdAt: { type: "string" },
                                            updatedAt: { type: "string" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Clinic not found" },
                },
            },
        },
        "/clinics/{id}": {
            get: {
                summary: "Get a clinic by ID",
                description: "Only authorized users",
                tags: ["Clinics"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Clinic ID",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Clinic by ID",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        name: { type: "string" },
                                        doctors: { type: "array", items: { type: "string" } },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Clinic not found" },
                },
            },
            put: {
                summary: "Update a clinic by ID",
                description: "Only role admin",
                tags: ["Clinics"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Clinic ID",
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    description: "Clinic data for update",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Clinic info updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        name: { type: "string" },
                                        doctors: { type: "array", items: { type: "string" } },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Clinic not found" },
                },
            },
            delete: {
                summary: "Delete a clinic by ID",
                description: "Only role admin",
                tags: ["Clinics"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Clinic ID",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "204": { description: "Clinic was deleted, NO CONTENT" },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Clinic not found" },
                },
            },
        },
        "/clinics/{id}/doctors": {
            patch: {
                summary: "Add doctor to clinic",
                description: "Only role admin",
                tags: ["Clinics"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Clinic ID",
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    description: "Doctor ID",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    doctorId: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Clinic's doctors updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        name: { type: "string" },
                                        doctors: { type: "array", items: { type: "string" } },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "400": { description: "Bad request" },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Clinic not found" },
                },
            },
        },
        "/clinics/{id}/doctors/{doctorId}": {
            patch: {
                summary: "Remove doctor from clinic",
                description: "Only role admin",
                tags: ["Clinics"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Clinic ID",
                        schema: { type: "string" },
                    },
                    {
                        name: "doctorId",
                        in: "path",
                        required: true,
                        description: "Doctor ID",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Clinic's doctors updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        name: { type: "string" },
                                        doctors: { type: "array", items: { type: "string" } },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "400": { description: "Bad request" },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Clinic or Doctor not found" },
                },
            },
        },
        "/doctors": {
            get: {
                summary: "Get list of doctors by query params",
                description: "Only authorized users",
                tags: ["Doctors"],
                security: [{ bearerAuth: [] }],
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
                        description: "All doctors by query params",
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
                                                    _id: { type: "string" },
                                                    firstName: { type: "string" },
                                                    lastName: { type: "string" },
                                                    email: { type: "string" },
                                                    phone: { type: "string" },
                                                    clinics: {
                                                        type: "array",
                                                        items: {
                                                            type: "array",
                                                            items: {
                                                                type: "object",
                                                                properties: {
                                                                    _id: { type: "string" },
                                                                    name: { type: "string" },
                                                                    doctors: {
                                                                        type: "array",
                                                                        items: { type: "string" },
                                                                    },
                                                                    createdAt: { type: "string" },
                                                                    updatedAt: { type: "string" },
                                                                },
                                                            },
                                                        },
                                                    },
                                                    specialties: {
                                                        type: "array",
                                                        items: {
                                                            type: "array",
                                                            items: {
                                                                type: "object",
                                                                properties: {
                                                                    _id: { type: "string" },
                                                                    name: { type: "string" },
                                                                    createdAt: { type: "string" },
                                                                    updatedAt: { type: "string" },
                                                                },
                                                            },
                                                        },
                                                    },
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
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                },
            },
            post: {
                summary: "Create a doctor",
                description: "Only role admin",
                tags: ["Doctors"],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    description: "Doctor data transfer object",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string" },
                                    phone: { type: "string" },
                                    firstName: { type: "string" },
                                    lastName: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Create new doctor",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        firstName: { type: "string" },
                                        lastName: { type: "string" },
                                        email: { type: "string" },
                                        phone: { type: "string" },
                                        clinics: { type: "array", items: { type: "string" } },
                                        specialties: { type: "array", items: { type: "string" } },
                                        _id: { type: "string" },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                },
            },
        },
        "/doctors/{id}": {
            get: {
                summary: "Get a doctor by ID",
                description: "Only authorized users",
                tags: ["Doctors"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Doctor ID",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Doctor by ID",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        firstName: { type: "string" },
                                        lastName: { type: "string" },
                                        email: { type: "string" },
                                        phone: { type: "string" },
                                        doctors: { type: "array", items: { type: "string" } },
                                        specialties: { type: "array", items: { type: "string" } },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Doctor not found" },
                },
            },
            put: {
                summary: "Update a doctor by ID",
                description: "Only role admin",
                tags: ["Doctors"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Doctor ID",
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    description: "Doctor data for update",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    firstName: { type: "string" },
                                    lastName: { type: "string" },
                                    email: { type: "string" },
                                    phone: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Doctor info updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        firstName: { type: "string" },
                                        lastName: { type: "string" },
                                        email: { type: "string" },
                                        phone: { type: "string" },
                                        doctors: { type: "array", items: { type: "string" } },
                                        specialties: { type: "array", items: { type: "string" } },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "400": { description: "Bad request" },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Clinic not found" },
                },
            },
            delete: {
                summary: "Delete a doctor by ID",
                description: "Only role admin",
                tags: ["Doctors"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Doctor ID",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "204": { description: "Doctor was deleted, NO CONTENT" },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Clinic not found" },
                },
            },
        },
        "/doctors/{id}/clinics": {
            patch: {
                summary: "Add clinic to doctor",
                description: "Only role admin",
                tags: ["Doctors"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Doctor ID",
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    description: "Clinic ID",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    clinicId: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Doctor's clinics updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        firstName: { type: "string" },
                                        lastName: { type: "string" },
                                        email: { type: "string" },
                                        phone: { type: "string" },
                                        doctors: { type: "array", items: { type: "string" } },
                                        specialties: { type: "array", items: { type: "string" } },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "400": { description: "Bad request" },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Clinic not found" },
                },
            },
        },
        "/doctors/{id}/clinics/{clinicId}": {
            patch: {
                summary: "Remove clinic from doctor",
                description: "Only role admin",
                tags: ["Doctors"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Doctor ID",
                        schema: { type: "string" },
                    },
                    {
                        name: "clinicId",
                        in: "path",
                        required: true,
                        description: "Clinic ID",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Doctor's clinics updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        firstName: { type: "string" },
                                        lastName: { type: "string" },
                                        email: { type: "string" },
                                        phone: { type: "string" },
                                        doctors: { type: "array", items: { type: "string" } },
                                        specialties: { type: "array", items: { type: "string" } },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "400": { description: "Bad request" },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Clinic or Doctor not found" },
                },
            },
        },
        "/doctors/{id}/specialties": {
            patch: {
                summary: "Add specialty to doctor",
                description: "Only role admin",
                tags: ["Doctors"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Doctor ID",
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    description: "Specialty ID",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    specialtyId: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Doctor's specialties updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        firstName: { type: "string" },
                                        lastName: { type: "string" },
                                        email: { type: "string" },
                                        phone: { type: "string" },
                                        doctors: { type: "array", items: { type: "string" } },
                                        specialties: { type: "array", items: { type: "string" } },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "400": { description: "Bad request" },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Clinic not found" },
                },
            },
        },
        "/doctors/{id}/specialties/{specialtyId}": {
            patch: {
                summary: "Remove specialty from doctor",
                description: "Only role admin",
                tags: ["Doctors"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Doctor ID",
                        schema: { type: "string" },
                    },
                    {
                        name: "specialtyId",
                        in: "path",
                        required: true,
                        description: "Specialty ID",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Doctor's specialties updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        firstName: { type: "string" },
                                        lastName: { type: "string" },
                                        email: { type: "string" },
                                        phone: { type: "string" },
                                        doctors: { type: "array", items: { type: "string" } },
                                        specialties: { type: "array", items: { type: "string" } },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "400": { description: "Bad request" },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Clinic or Doctor not found" },
                },
            },
        },
        "/specialties": {
            get: {
                summary: "Get list of specialties by query params",
                description: "Only authorized users",
                tags: ["Specialties"],
                security: [{ bearerAuth: [] }],
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
                        description: "All specialties by query params",
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
                                                    _id: { type: "string" },
                                                    name: { type: "string" },
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
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                },
            },
            post: {
                summary: "Create a specialty",
                description: "Only role admin",
                tags: ["Specialties"],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    description: "Specialty data transfer object",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Create new specialty",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        name: { type: "string" },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                },
            },
        },
        "/specialties/{id}": {
            get: {
                summary: "Get a specialty by ID",
                description: "Only authorized users",
                tags: ["Specialties"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Specialty ID",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Specialty by ID",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        name: { type: "string" },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Doctor not found" },
                },
            },
            put: {
                summary: "Update a specialty by ID",
                description: "Only role admin",
                tags: ["Specialties"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Specialty ID",
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    description: "Specialty data for update",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Specialty info updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        name: { type: "string" },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "400": { description: "Bad request" },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Clinic not found" },
                },
            },
            delete: {
                summary: "Delete a specialty by ID",
                description: "Only role admin",
                tags: ["Specialties"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Specialty ID",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "204": { description: "Specialty was deleted, NO CONTENT" },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Forbidden" },
                    "404": { description: "Clinic not found" },
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
