import express from "express";
import { connect } from "./db";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

import imageRouter from "./resources/image/image.router";
import userRouter from "./resources/user/user.router";
import authRouter from "./resources/auth/auth.router";

import { protect } from "./resources/utils/auth";

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/apis/auth", authRouter);
app.use("/apis/users", userRouter);
app.use("/apis", protect);
app.use("/apis/images", upload.single("image"), imageRouter);

app.get("/", async (req, res) => {
  res.json({ text: "hey this is a json sent after connecting to db!!" });
});

export async function start() {
  await connect();
  console.log("connected to db successfully!");
  app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
  );
}
