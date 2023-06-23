import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  name: String,
  url: String,
  state: Boolean,
});

export const Badge = mongoose.model("Badge", badgeSchema);
