import mongoose from "mongoose"

const alertSchema = new mongoose.Schema({
  code: { type: String, required: true },
  type: { type: String, enum: ["gas", "flame", "both"], required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Alert", alertSchema);
