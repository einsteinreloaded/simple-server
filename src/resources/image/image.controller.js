import { Image } from "./image.model";
import sharp from "sharp";

const createOne = (model) => async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({
        message:
          "No image file has been recieved at our end! Please attach an image file",
      });
    const { buffer, mimetype } = req.file;
    const doc = await model.create({
      title: req.body.title,
      user: req.user._id,
      image: {
        data: buffer,
        contentType: mimetype,
      },
    });
    const processedImage = await sharp(buffer)
      .grayscale()
      .resize({ width: 100 })
      .toBuffer();
    return res.status(201).contentType(mimetype).send(processedImage);
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message:
        "Image with the same title is already created by you. Please change the title and try again!",
    });
  }
};

const getAll = (model) => async (req, res) => {
  try {
    const queryParams = req.query;
    const docs = await model.find(queryParams).lean().exec();
    res.status(201).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const getOne = (model) => async (req, res) => {
  try {
    const { id } = req.params;
    const image = await model.findById(id).lean().exec();
    res.status(201).json({ data: image });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export default {
  createOne: createOne(Image),
  getAll: getAll(Image),
  getOne: getOne(Image),
};
