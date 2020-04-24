import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  password: String,
  username: { type: String, unique: true },
  date: { type: Date, default: Date.now }
});
userSchema.index({ username: 1 }, { unique: true });

export const User = mongoose.model("user", userSchema);
