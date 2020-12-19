import mongoose from "mongoose";
import config from "config";
const uri:string = config.get("dbConfigUrl");

export const connect = () => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
};
