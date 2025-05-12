import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/GameInfo.css";

function GameInfo() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`/api/games/${id}`);
        setGame(response.data);
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) {
    return (
      <div className="loading-div">
        <button className="btn btn-square">
          <span className="loading loading-spinner"></span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="game_main">
        <div className="game-left_side">
          <div className="game_name">
            <h1>{game.name}</h1>
          </div>
          <div className="game_image">
            <img src={game.image} alt={game.name} />
          </div>
        </div>

        <div className="game-right_side">
          <div className="game_sub-info">
            <p>Released: {game.released}</p>
            <p>Rating: {game.rating}</p>
          </div>

          <div
            className="game_description"
            dangerouslySetInnerHTML={{ __html: game.description }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default GameInfo;
