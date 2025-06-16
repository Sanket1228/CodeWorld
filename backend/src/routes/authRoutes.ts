import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User Already Exist" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});

export default router;
