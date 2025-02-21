"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "API documentation for my project",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server",
            },
        ],
        tags: [
            {
                name: "auth",
                description: "Authentication management API",
            },
            {
                name: "post",
                description: "Posts-related operations",
            },
        ],
    },
    apis: ["./src/routes/*.ts"], // Path to API routes (adjust as needed)
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
const setupSwagger = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, {
        swaggerOptions: {
            filter: true,
            tagsSorter: "alpha", // Sort tags alphabetically
            operationsSorter: "alpha", // Sort API operations
        }
    }));
    console.log("Swagger docs available at http://localhost:3000/api-docs");
};
exports.setupSwagger = setupSwagger;
