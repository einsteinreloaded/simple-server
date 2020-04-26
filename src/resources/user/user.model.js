import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  password: String,
  username: { type: String, unique: true },
  date: { type: Date, default: Date.now }
});

userSchema.methods.checkPassword = async function(password) {
  try {
    const hashedPassword = this.password;
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (e) {
    console.log(e);
    throw new Error("Invalid Password");
  }
};

userSchema.index({ username: 1 }, { unique: true });

export const User = mongoose.model("user", userSchema);
