import { Auth } from "./auth.model";
import jwt from "jsonwebtoken";
import { protect } from "../utils/auth";

const createOne = model => async (req, res) => {
  try {
    const salt = Date.now().toString();
    const token = jwt.sign(
      {
        userId: req.userId
      },
      salt
    );
    const authDoc = await model.create({ token, salt, user: req.userId });
    res.setHeader("auth-token", token);
  } catch (e) {
    console.error(e);
    res.status(400).end("Something went wrong while generating token!!");
  }
};

const verifyToken = async (req, res, next) => {
  protect(req, res, () => res.status(201).json({ data: req.user }));
};

export default { createOne: createOne(Auth), verifyToken };
