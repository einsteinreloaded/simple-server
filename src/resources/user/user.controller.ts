import { User } from "./user.model";
import authController from "../auth/auth.controller";
import bcrypt from "bcrypt";

const saltRounds = 10;

const createPasswordHash = async password => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (e) {
    throw new Error("Password encryption failed!!");
  }
};

const createOne = model => async (req, res) => {
  try {
    const password = await createPasswordHash(req.body.password);
    const doc = await model.create({ ...req.body, password });
    const { password: passwd, _id, ...user } = doc.toJSON();
    res.status(201).json({ data: user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e });
  }
};

const updatePassword = model => async (req, res) => {
  try {
    let { username, password } = req.body;
    password = await createPasswordHash(password);
    await model.findOneAndUpdate(
      { username },
      { password },
      { new: true, fields: "firstname lastname username" }
    );
    res.status(204).end();
  } catch ({ errmsg }) {
    res.status(400).json({ message: "Something Went Wrong!!" });
  }
};

const getAll = model => async (req, res) => {
  try {
    const docs = await model
      .find()
      .lean()
      .exec();
    res.status(201).json({ data: docs });
  } catch ({ errmsg }) {
    res.status(400).json({ message: errmsg });
  }
};

const login = model => async (req, res) => {
  try {
    const { username, password } = req.body;
    const doc = await model
      .findOne({ username }, "firstname lastname username password")
      .exec();
    if (!doc) {
      return res
        .status(401)
        .json({ message: "Invalid username or password!!" });
    }
    const { password: hashedPassword, ...user } = doc.toJSON();
    const isAuthenticated = await doc.checkPassword(password);

    if (isAuthenticated) {
      req.userId = user._id;
      await authController.createOne(req, res);
      return res.status(201).json({ data: user });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid username or password!!" });
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Invalid username or password!!" });
  }
};

export default {
  createOne: createOne(User),
  getAll: getAll(User),
  signIn: login(User),
  updatePassword: updatePassword(User)
};
