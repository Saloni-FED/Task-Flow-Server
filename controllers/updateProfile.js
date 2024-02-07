import Users from "../models/users.js";
import { uploadFileInCloudinary } from "../utils/cloudinary.js";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

export const profileUpdate = async (req, res) => {
  const { username, bio } = req.body;
  let image = req.file ? req.file.path : null;
  let cloudinaryResponse;
  let optimizedImagePath = null; 

  try {
    if (image) {
      const compressedDir = path.join(process.cwd(), 'public', 'compressed');
      fs.mkdirSync(compressedDir, { recursive: true }); 
      optimizedImagePath = path.join(compressedDir, `optimized-${Date.now()}.jpg`);
      
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

    res.status(200).json({
      message: "Profile updated successfully",
      user: { bio: user.bio, username: user.username, image: user.image },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
