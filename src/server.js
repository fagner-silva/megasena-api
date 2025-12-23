require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./db");

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  await connectDB();
  app.listen(PORT, "0.0.0.0", () => console.log(`🚀 API rodando na porta ${PORT}`));
}

bootstrap();
