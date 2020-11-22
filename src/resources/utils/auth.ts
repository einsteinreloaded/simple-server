import { NextFunction, Request, Response } from "express";
import { Auth } from "../auth/auth.model";

export const protect = async (req:any, res:Response, next:NextFunction) => {
  try {
    const token:string|undefined = req.header("auth-token");
    if (!token) {
      return res.status(401).json({ message: "User not authenticated!!" });
    }
    const doc = await Auth.findOne({ token }, "user")
      .populate("user", "firstname lastname username")
      .lean()
      .exec();
    if (doc) {
      req.user = doc.user;
      next();
    } else {
      return res.status(401).json({ message: "User not authenticated!!" });
    }
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: "User not authenticated!!" });
  }
};
