const mongoose = require("mongoose");

const DrawSchema = new mongoose.Schema(
  {
    numbers: { type: [Number], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Draw", DrawSchema);
