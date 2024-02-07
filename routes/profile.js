import express from "express";
import { profileUpdate } from "../controllers/updateProfile.js"
import { upload } from "../middleware/multer.js";

const route = express();

route.post("/profile/update", upload.single("image"), profileUpdate);

export default route;
