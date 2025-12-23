const swaggerJSDoc = require("swagger-jsdoc");

const baseUrl =
  process.env.RENDER_EXTERNAL_URL ||
  `http://localhost:${process.env.PORT || 3000}`;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Mega-Sena API",
    version: "1.0.0",
    description: "CRUD de jogos + sorteio + comparação",
  },
  servers: [{ url: baseUrl }],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJSDoc(options);
