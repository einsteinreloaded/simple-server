import { User } from "./user.model";
import bcrypt from "bcrypt";

const saltRounds = 10;

const createOne = model => async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    const doc = await model.create({ ...req.body });
    res.status(201).json({ data: doc });
  } catch ({ errmsg }) {
    res.status(400).json({ message: errmsg });
  }
};

const updatePassword = model => async (req, res) => {
  try {
    let { username, password } = req.body;
    password = await bcrypt.hash(password, saltRounds);
    const doc = await model.findOneAndUpdate(
      { username },
      { password },
      { new: true, fields: "firstname lastname username" }
    );
    res.status(204).end(); //json({ data: doc, message: "Update Successful!!" });
  } catch ({ errmsg }) {
    res.status(400).json({ message: "Something Went Wrong!!" });
  }
};

const getAll = model => async (req, res) => {
  try {
    const docs = await model.find().exec();
    res.status(201).json({ data: docs });
  } catch ({ errmsg }) {
    res.status(400).json({ message: errmsg });
  }
};

const authenticate = model => async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await model
      .findOne({ username }, "-_id firstname lastname username password")
      .exec();
    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (isAuthenticated) {
      delete user.password;
      return res.status(201).json({ data: user });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid username or password!!" });
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Something Went Wrong!!" });
  }
};

export default {
  createOne: createOne(User),
  getAll: getAll(User),
  signIn: authenticate(User),
  updatePassword: updatePassword(User)
};
