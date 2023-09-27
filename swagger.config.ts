// swaggerSpec是api的json数据

import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SCC Cloud API",
            version: "1.0.0",
            description:
                "IoT cloud management, including device management, user management, and more.",
        },
        servers: [
            {
                url: "/swagger-json",
                description: "Local server",
            },
        ],
    },
    apis: ["./src/apidocs/*.apidoc.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
