import { ObjectId, ObjectID } from "mongodb";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
export interface Image extends mongoose.Document {
  title: String,
  user: ObjectId,
  image: { data: Buffer, contentType: String }
}
const imageSchema = new Schema({
  title: String,
  user: { type: ObjectId, ref: "user" },
  image: { data: Buffer, contentType: String }
});
imageSchema.index({ title: 1, user: 1 }, { unique: true });

export const Image = mongoose.model<Image>("image", imageSchema);
