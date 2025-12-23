const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Mega-Sena API",
    version: "1.0.0",
    description: "CRUD de jogos + cadastro de sorteio + comparação (4/5/6 acertos).",
  },
  servers: [
    { url: "http://localhost:3000", description: "Local" },
    // depois de subir no Render, você pode trocar/duplicar com a URL do serviço
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // onde estarão as anotações
};

module.exports = swaggerJSDoc(options);
