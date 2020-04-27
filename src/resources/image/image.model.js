import mongoose from "mongoose";
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  title: String,
  user: { type: mongoose.ObjectId, ref: "user" },
  image: { data: Buffer, contentType: String }
});
imageSchema.index({ title: 1, user: 1 }, { unique: true });

export const Image = mongoose.model("image", imageSchema);
