import Users from "../models/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();
// console.log(process.env.JWT_SECRET);

export const signup = async (req, res) => {
  console.log(req.body)
  if (req.body.accessToken) {
    console.log(accessToken);
  } else {
    const { name, email, password } = req.body;
    try {
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(401).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await Users.create({
        name : name + ':G',
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
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
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
    console.error("Signin error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
