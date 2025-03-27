import express from 'express';
import { getGames, getGamesById } from '../controllers/gamesController.js';

const router = express.Router();

router.get('/', getGames);
router.get('/:id', getGamesById);

export default router;