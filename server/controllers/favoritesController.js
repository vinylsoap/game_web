import pool from '../database/db.js';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

// GET 
// @favourites
export const getFavourites = async (req, res) => {
  const userId = req.session.userId;

  try {
    const result = await pool.query(' SELECT * FROM favourites WHERE user_id = $1 ', [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Failed to get favorites');
    res.status(500).json({ error: 'Server error' });
  }
};


// POST
// @favourites
export const addFavourite = async (req, res) => {
  const userId = req.session.userId;
  const { game_id } = req.body;

  if (!userId) {
    return res.status(403).json({ error: 'You must be logged in' });
  }

  try {

    const gamesResponse = await axios.get(`${API_BASE_URL}/games?key=${API_KEY}&genres=indie&page_size=30`);
      
    const indieGames = gamesResponse.data.results.map(game => game.id);

    if(!indieGames.includes(parseInt(game_id))) {
      return res.status(400).json({ error: 'Game is not found' });
    }

    const checkGame = await pool.query(
      ' SELECT * FROM favourites WHERE user_id = $1 AND game_id = $2',
      [userId, game_id]
    )

    if (checkGame.rows.length > 0) {
      return res.status(400).json({ error: 'This game already is in favorites' })
    }

    const gameData = gamesResponse.data.results.find(game => game.id === parseInt(game_id));
    const game_title = gameData.name;
    const game_image = gameData.background_image;

    await pool.query(
      'INSERT INTO favourites (user_id, game_id, game_title, game_image) VALUES ($1, $2, $3, $4)',
      [userId, game_id, game_title, game_image]
    )
    
    return res.status(201).json({ message: 'Added to favorites' });

  } catch (error) {
    console.error('Failed to add to favorites: ', error); 
    res.status(500).json({ error: 'Server error' });
  }
}


// DELETE
// @favourites
export const removeFavourite = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;

  try {
    await pool.query(' DELETE FROM favourites WHERE user_id = $1 AND id = $2 ', [userId, id]);
    return res.status(200).json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Failed to remove: ', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
