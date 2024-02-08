import multer from "multer";
import path from "path";
// import { fileURLToPath } from "url";
import dotenv from 'dotenv';
dotenv.config()
const __dirname = process.cwd();
// // console.log("dirname", __dirname)
// console.log("NODE_ENV:", process.env.NODE_ENV);

const images =
  process.env.NODE_ENV === "development"
    ? path.join(__dirname, "/uploads")
    : "/tmp";

// console.log(images);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, images);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    console.log(file.originalname);
  },
});

export const upload = multer({ storage: storage });
