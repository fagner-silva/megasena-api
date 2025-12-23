const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true },
    numbers: { type: [Number], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", GameSchema);
