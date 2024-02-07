import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
// console.log("filename ", filename)
const dirname = path.dirname(filename)
// console.log("dirname", dirname)
const images = path.join(dirname, '../public');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, images);
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname); 
  },
});



export const upload = multer({ storage: storage });
