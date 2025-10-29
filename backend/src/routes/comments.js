import express from "express";
import Comment from "../models/comment.js";

const router = express.Router();

// Get all comments
router.get("/", async (req, res) => {
  const comments = await Comment.find().populate("user");
  res.json(comments);
});

// Add comment
router.post("/", async (req, res) => {
  const { text, userId } = req.body;
  const newComment = await Comment.create({ text, user: userId });
  res.json(newComment);
});

// Add reply
router.post("/:id/reply", async (req, res) => {
  const { text, userId } = req.body;
  const parent = await Comment.findById(req.params.id);
  if (!parent) return res.status(404).json({ message: "Parent comment not found" });
  const reply = await Comment.create({ text, user: userId });
  parent.replies.push(reply._id);
  await parent.save();
  
  res.json(reply);
});

export default router;
