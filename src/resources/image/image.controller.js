import { Image } from "./image.model";

const createOne = model => async (req, res) => {
  try {
    const doc = await model.create({
      title: req.body.title,
      user: req.user._id,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });
    console.log(doc);
    res
      .status(201)
      .contentType(doc.image.contentType)
      .send(doc.image.data);
  } catch (e) {
    console.error(e);
    res
      .status(400)
      .json({
        message:
          "Image with the same title is already created by you. Please change the title and try again!"
      });
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

export default { createOne: createOne(Image), getAll: getAll(Image) };
