import multer from "multer";
import path from "path";

const images = path.join(process.cwd(), 'public');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, images);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

export const upload = multer({ storage: storage });
