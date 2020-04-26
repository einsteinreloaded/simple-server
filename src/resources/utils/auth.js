import { Auth } from "../auth/auth.model";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers["auth-token"];
    if (!token) {
      return res.status(401).json({ message: "User not authenticated!!" });
    }
    const doc = await Auth.findOne({ token }, "user")
      .populate("user", "firstname lastname username -_id")
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
