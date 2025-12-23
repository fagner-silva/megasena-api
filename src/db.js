const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri || !uri.startsWith("mongodb")) {
    throw new Error(
      `MONGO_URI inválida ou ausente. Recebido: "${uri || ""}".`
    );
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("✅ MongoDB conectado");
}

module.exports = { connectDB };
