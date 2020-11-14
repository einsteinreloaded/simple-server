import { ObjectID, ObjectId } from "mongodb";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
export interface Auth extends mongoose.Document {
  token: String,
  user: ObjectId,
  salt: String,
  createdOn: Date
}
const authSchema = new Schema({
  token: String,
  user: { type: ObjectId, ref: "user" },
  salt: String,
  createdOn: { type: Date, default: Date.now }
});

authSchema.index({ user: 1, token: 1 }, { unique: true });

export const Auth = mongoose.model<Auth>("auth", authSchema);
