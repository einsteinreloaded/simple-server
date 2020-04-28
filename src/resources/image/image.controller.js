import { Image } from "./image.model";
import sharp from "sharp";

const createOne = model => async (req, res) => {
  try {
    const { buffer, mimetype } = req.file;
    const doc = await model.create({
      title: req.body.title,
      user: req.user._id,
      image: {
        data: buffer,
        contentType: mimetype
      }
    });
    const processedImage = await sharp(buffer)
      .grayscale()
      .resize({ width: 100 })
      .toBuffer();
    return res
      .status(201)
      .contentType(mimetype)
      .send(processedImage);
  } catch (e) {
    console.error(e);
    res.status(400).json({
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
