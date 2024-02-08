import multer from "multer";
import path from "path";
import fs from 'fs';

// Define the destination directory
const destinationDirectory = path.join(process.cwd(), 'uploads');

// Check if the directory exists
if (!fs.existsSync(destinationDirectory)) {
  // If it doesn't exist, create it
  fs.mkdirSync(destinationDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

export const upload = multer({ storage: storage });
