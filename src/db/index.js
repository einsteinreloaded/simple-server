import mongoose from "mongoose";
import config from "config";
const uri = config.get("dbConfigUrl");

export const connect = () => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
};
