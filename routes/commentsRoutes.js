import express from 'express';
import { getComments, addComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

// Comments routes
router.get('/', getComments);
router.post('/', addComment);
router.delete('/:id', deleteComment);

export default router;