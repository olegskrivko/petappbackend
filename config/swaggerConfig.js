// const swaggerJsdoc = require("swagger-jsdoc");

// const options = {
//   swaggerDefinition: {
//     openapi: "3.0.0", // Specification (optional, defaults to swagger: '2.0')
//     info: {
//       title: "Pets API", // Title (required)
//       version: "1.0.0", // Version (required)
//       description: "APIs for managing pets and options",
//     },
//   },
//   apis: ["./routes/*.js"], // Path to the API docs
// };

// const specs = swaggerJsdoc(options);

// module.exports = specs;
// swagger.js

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0", // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "API documentation for your MERN application",
    },
    basePath: "/api", // Base path (optional)
    components: {
      schemas: {
        // Define your schemas here
        Option: {
          type: "object",
          properties: {
            key: {
              type: "string",
              example: "size",
              description: "The key of the option",
            },
            values: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  value: {
                    type: "number",
                    example: 0,
                    description: "The value of the option",
                  },
                  translations: {
                    type: "object",
                    properties: {
                      en: {
                        type: "string",
                        example: "Small",
                        description: "English translation",
                      },
                      es: {
                        type: "string",
                        example: "Pequeño",
                        description: "Spanish translation",
                      },
                      fr: {
                        type: "string",
                        example: "Petit",
                        description: "French translation",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Path to the API routes folder or files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
