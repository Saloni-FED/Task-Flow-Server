import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();
console.log(process.env.CLOUD_NAME);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadFileInCloudinary = async (file) => {
    try {
        if (!file) {
            return null;
          }
         const response = cloudinary.uploader.upload(file, {
            resource_type: "auto",
          });
          console.log(response)
          return response;
    } catch (error) {
        fs.unlinkSync(file)
    }
  
};
