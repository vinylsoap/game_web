import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
  updateComment,
} from "../controllers/commentController.js";

const router = express.Router();

// Comments routes
router.get("/:game_id", getComments);
router.post("/", addComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
