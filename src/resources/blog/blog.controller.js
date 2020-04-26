import { Blog } from "./blog.model";

const createOne = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const getAll = model => async (req, res) => {
  try {
    const docs = await model
      .find()
      .lean()
      .exec();
    res.status(201).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export default { createOne: createOne(Blog), getAll: getAll(Blog) };
