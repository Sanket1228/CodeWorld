import dotenv from "dotenv";
import express from "express";
import { protect } from "../middleware/authMiddleware";
import { Snippet } from "../models/snippetModel";

dotenv.config();
const router = express.Router();

router.get("/", async (req, res) => {
  const snippets = await Snippet.find({ isPublic: true }).sort({
    createdAt: -1,
  });
  res.json(snippets);
});

router.get("/me", protect, async (req: any, res) => {
  const snippets = await Snippet.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(snippets);
});

router.post("/", protect, async (req, res) => {
  const { title, code, language, tags, isPublic, userId } = req.body;

  const snippet = new Snippet({
    title,
    code,
    language,
    tags,
    isPublic,
    user: userId,
  });

  const created = await snippet.save();

  res.status(201).json(created);
});

export default router;
