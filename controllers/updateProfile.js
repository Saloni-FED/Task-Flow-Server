import Users from "../models/users.js";
import { uploadFileInCloudinary } from "../utils/cloudinary.js";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

// Determine the current directory
const __dirname = process.cwd();

export const profileUpdate = async (req, res) => {
  const { username, bio } = req.body;
  let image = req.file ? req.file.path : null;
  let cloudinaryResponse;
  let optimizedImagePath = null;
  console.log(process.env.NODE_ENV);
  try {
    if (image) {
      console.log(image.originalname);
      console.log(image);
      const compressedImagePath =
        process.env.NODE_ENV === "development"
          ? path.join(__dirname, "/uploads", `${Date.now().toString()}_.jpg`)
          : path.join("/tmp", `${Date.now().toString()}_.jpg`);

      // Using sharp to resize and optimize the image
      await sharp(image)
        .resize({ width: 800 })
        .jpeg({ quality: 80 })
        .toFile(compressedImagePath);

      // Upload the optimized image to Cloudinary
      cloudinaryResponse = await uploadFileInCloudinary(compressedImagePath);

      if (cloudinaryResponse) {
        fs.unlinkSync(compressedImagePath);
      }
    }

    // Find user by ID
    let user = await Users.findById(req.user.userId);

    if (!user) {
      return res.status(401).send("User is unauthorized");
    }

    // Update user fields
    if (bio) user.bio = bio;
    if (username) user.username = username;
    if (cloudinaryResponse) user.image = cloudinaryResponse.secure_url;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: { bio: user.bio, username: user.username, image: user.image },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
