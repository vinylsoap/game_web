import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";
import HeartButton from "./HeartButton.jsx";

function GamesList() {
  const [game, setName] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const res = await fetch("/api/games");
      const data = await res.json();
      setName(data);
    };

    const fetchFavorites = async () => {
      const res = await fetch("/api/favourites", {
        credentials: "include",
      });
      const favs = await res.json();
      setFavorites(favs.map((f) => f.game_id));
    };

    fetchGames();
    fetchFavorites();
  }, []);

  if (game.length === 0) {
    return (
      <div className="loading-div">
        <button className="btn btn-square">
          <span className="loading loading-spinner"></span>
        </button>
      </div>
    );
  }

  return (
    <div className="body">
      <div className="games_list">
        {game.map((game) => {
          return (
            <div
              className="card bg-base-100 image-full w-96 shadow-sm"
              key={game.id}
            >
              <figure>
                <img src={game.image} alt={game.name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{game.name}</h2>
                <div className="card-actions justify-end">
                  <Link to={`/games/${game.id}`}>
                    <button className="btn btn-primary btn_more">More</button>
                  </Link>
                  <HeartButton
                    gameId={game.id}
                    isInitiallyFavorited={favorites.includes(game.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GamesList;
