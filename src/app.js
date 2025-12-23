const express = require("express");
const cors = require("cors");

const gamesRoutes = require("./routes/games.routes");
const drawsRoutes = require("./routes/draws.routes");
const resultsRoutes = require("./routes/results.routes");

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/docs.json", (_req, res) => res.json(swaggerSpec));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/games", gamesRoutes);
app.use("/draws", drawsRoutes);
app.use("/results", resultsRoutes);

module.exports = app;
