import pool from "../database/db.js";
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

// Get all comments
export const getComments = async (req, res) => {
  const { game_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT comments.id, comments.content, comments.created_at, comments.user_id, users.username 
      FROM comments 
      JOIN users ON comments.user_id = users.id
      WHERE comments.game_id = $1
      ORDER BY comments.created_at DESC`,
      [game_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Comments connection failed", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Post comment
export const addComment = async (req, res) => {
  const { content } = req.body;
  const { game_id } = req.body;

  if (!req.session.userId) {
    return res.status(403).json({ error: "You must be logged in" });
  }

  const userId = req.session.userId;

  try {
    if (!content || content.trim() === "") {
      return res.status(400).json({ error: "Cant be empty!" });
    }

    const gamesResponse = await axios.get(
      `${API_BASE_URL}/games?key=${API_KEY}&genres=indie&page_size=30`
    );

    const indieGames = gamesResponse.data.results.map((game) => game.id);

    if (!indieGames.includes(parseInt(game_id))) {
      return res.status(400).json({ error: "Game is not found" });
    }

    const result = await pool.query(
      "INSERT INTO comments (content, game_id, user_id) VALUES ($1, $2, $3) RETURNING id",
      [content, game_id, userId]
    );

    const insertedId = result.rows[0].id;

    const enriched = await pool.query(
      `SELECT comments.id, comments.content, comments.created_at, comments.user_id, users.username FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE comments.id = $1`,
      [insertedId]
    );

    return res.status(201).json(enriched.rows[0]);
  } catch (err) {
    console.error("Failed to post.", err);
    return res.status(500).json({ error: "Server failed" });
  }
};

// Update comment
export const updateComment = async (req, res) => {
  if (!req.session.userId) {
    return res.status(403).json({ error: "You must be logged in" });
  }

  const { content } = req.body;

  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const comment = await pool.query("SELECT * FROM comments WHERE id = $1", [
      id,
    ]);

    if (comment.rows.length === 0) {
      return res.status(404).json({ error: "Couldnt find the comment" });
    }

    if (comment.rows[0].user_id !== userId) {
      return res.status(403).json({ error: "Update your own comments" });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({ error: "Cant be empty!" });
    }

    const result = await pool.query(
      "UPDATE comments SET content = $1 WHERE id = $2 RETURNING *",
      [content, id]
    );
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Failed to update comment", err);
    res.status(500).json({ error: "Server failed" });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  if (!req.session.userId) {
    return res
      .status(403)
      .json({ error: "You must be logged in to delete comments" });
  }

  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const comment = await pool.query("SELECT * FROM comments WHERE id = $1", [
      id,
    ]);

    if (comment.rows.length === 0) {
      return res.status(404).json({ error: "Couldnt find the comment" });
    }

    if (comment.rows[0].user_id !== userId) {
      return res.status(403).json({ error: "Delete your own comments" });
    }

    await pool.query("DELETE FROM comments WHERE id = $1", [id]);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error("Failed to delete comment", err);
    res.status(500).json({ error: "Server failed" });
  }
};
