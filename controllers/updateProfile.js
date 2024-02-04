import Users from "../models/users.js";
import { uploadFileInCloudinary } from "../utils/cloudinary.js";
import sharp from "sharp";
import fs from "fs";

export const profileUpdate = async (req, res) => {
  const { username, bio } = req.body;
  let image = req.file ? req.file.path : null;
  let cloudinaryResponse;
  let optimizedImagePath = null; // Define it here

  try {
    // Compress and upload image to Cloudinary
    if (image) {
      optimizedImagePath = `./public/compressed/optimized-${Date.now()}.jpg`; 
      await sharp(image)
        .resize({ width: 800 })
        .jpeg({ quality: 80 })
        .toFile(optimizedImagePath);

      cloudinaryResponse = await uploadFileInCloudinary(optimizedImagePath);
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

    if (optimizedImagePath) {
      fs.unlinkSync(optimizedImagePath);
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: { bio: user.bio, username: user.username, image: user.image },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};