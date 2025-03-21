import pool from '../database/db.js';

// Get all comments
export const getComments = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comments ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Comments connection failed', err);
    res.status(500).json({ error: 'Server error'});
  }
};

// Post comment
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || content.trim() === '') return res.status(400).json({ error: 'Cant be empty!'});

    const result = await pool.query('INSERT INTO comments (content) VALUES ($1) RETURNING *', [content]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Failed to post.', err);
    res.status(500).json({ error: 'Server failed' });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const checkComment = await pool.query('SELECT * FROM comments WHERE id = $1', [id]);
    if (checkComment.rows.length === 0) {
      return res.status(404).json({ error: 'Couldnt find the comment'});
    }

    await pool.query('DELETE FROM comments WHERE id = $1', [id]);
    res.json({ message: 'Comment deleted succesfully!'})
  } catch (err) {
    console.error('Failed to delete comment', err);
    res.status(500).json({ error: 'Server failed' })
  }
}