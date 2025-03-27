import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

// Getting list of games
export const getGames = async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/games?key=${API_KEY}&genres=indie&page_size=30`);
    console.log('RAWG api: ', response.data)

    const filteredGames = response.data.results.map(game => ({
      id: game.id,
      name: game.name,
      released: game.released,
      image: game.background_image,
      rating: game.rating,
    }));
    res.json(filteredGames);
  } catch (error) {
    console.error('Failed to get the games:', error);
    res.status(500).json({ error: 'Server error' })
  }
};

// Get ONE game
export const getGamesById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${API_BASE_URL}/games/${id}?key=${API_KEY}`);

    const gameDetails = {
      id: response.data.id,
      name: response.data.name,
      released: response.data.released,
      image: response.data.background_image,
      rating: response.data.rating,
      description: response.data.description,
    };
    
    res.json(gameDetails);
  } catch (error) {
    console.error('Failed to get info about the game:', error);
    res.status(500).json({ error: 'Server failed' })
  }
};