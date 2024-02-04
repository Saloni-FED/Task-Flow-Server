import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connect = (url) => {
  return mongoose.connect(url);
};

export default connect;