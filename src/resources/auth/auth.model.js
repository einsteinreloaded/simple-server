import mongoose from "mongoose";
const Schema = mongoose.Schema;

const authSchema = new Schema({
  token: String,
  user: { type: mongoose.ObjectId, ref: "user" },
  salt: String,
  createdOn: { type: Date, default: Date.now }
});

authSchema.index({ user: 1, token: 1 }, { unique: true });

export const Auth = mongoose.model("auth", authSchema);
