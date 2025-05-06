import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
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
const swaggerSpec = swaggerJsdoc(swaggerOptions);
export const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            filter: true,
            tagsSorter: "alpha", // Sort tags alphabetically
            operationsSorter: "alpha", // Sort API operations
        }
    }));
    console.log("Swagger docs available at http://localhost:3000/api-docs");
};
