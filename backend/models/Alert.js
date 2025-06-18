import mongoose from "mongoose"

const alertSchema = new mongoose.Schema({
  deviceCode: { type: String, required: true },
  type: { type: String, enum: ["Gas", "Flame", "Normal"], required: true },
  message : {type:String, required:true},
  timestamp: { type: Date, default: Date.now }
});

export const Alert = mongoose.model("Alert", alertSchema)