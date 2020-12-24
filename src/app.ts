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
import { Socket } from "socket.io-client";

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/apis/auth", authRouter);
app.use("/apis/users", userRouter);
app.use("/apis", protect);
app.use("/apis/images", upload.single("image"), imageRouter);

app.get("/", async (_req, res) => {
  res.json({ text: "hey this is a json sent after connecting to db!!" });
});

io.on('connection', (socket:Socket) => { 
  console.log("websocket connected");

  socket.on("ping",(_name:String,fn:Function)=>{
    fn("pong");
  })

});

export async function start() {
  await connect();
  console.log("connected to db successfully!");
  server.listen(PORT, () =>
    console.log(`Simple Server listening at http://localhost:${PORT}`)
  );
}
