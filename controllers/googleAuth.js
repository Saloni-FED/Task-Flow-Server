// Import necessary modules
import Users from "../models/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();
// 109476090341717091034
// Handle Google sign-up
export const googleSignUp = async (req, res) => {
  console.log(req.body.accessToken);
  console.log(jwt.decode(req.body.accessToken));
  const { email, name, sub } = jwt.decode(req.body.accessToken);
  console.log(email, name, sub);

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(sub, 10);

    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser._id, name: newUser.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(201).json({ user: { name: newUser.name }, token });
  } catch (error) {
    console.log(error);
  }
};

export const googleSignIn = async (req, res) => {
  // console.log(req.body.accessToken);
  // console.log(jwt.decode(req.body.accessToken));
  const { email, name, sub } = jwt.decode(req.body.accessToken);

  try {
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      sub,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, name: existingUser.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({ user: { name: existingUser.name }, token });
  } catch (error) {
    console.log(error);
  }
};
