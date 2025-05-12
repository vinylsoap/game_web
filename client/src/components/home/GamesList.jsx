import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Favorites from "../../pages/home/Favorites";
import "../../styles/Navbar.css";

function GamesList() {
  const [game, setName] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    games();
    fetchFavorites();
  }, []);

  const games = async () => {
    try {
      const response = await axios.get("api/games");

      const filteredGames = response.data.map((game) => ({
        id: game.id,
        name: game.name,
        released: game.released,
        image: game.image,
        rating: game.rating,
      }));

      setName(filteredGames);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("/api/favourites", {
        withCredentials: true,
      });
      const favIds = response.data.map((fav) => fav.game_id);
      setFavorites(favIds);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const toggleFavorite = async (game) => {
    const isFav = favorites.includes(game.id);

    try {
      if (isFav) {
        await axios.delete(`/api/favourites/${game.id}`, {
          withCredentials: true,
        });

        setFavorites((prev) => prev.filter((id) => id !== game.id));
      } else {
        await axios.post(
          "/api/favourites",
          {
            game_id: game.id,
            game_title: game.name,
            game_image: game.image,
          },
          {
            withCredentials: true,
          }
        );
        setFavorites((prev) => [...prev, game.id]);
      }
    } catch (error) {
      console.error("toggling error:", error);
    }
  };

  if (game.length === 0) {
    return (
      <div className="loading-div">
        <button className="btn btn-square">
          <span className="loading loading-spinner"></span>
        </button>
      </div>
    );
  }

  // ERROR WITH LOGIN CAUSE YOU NEED TO LOG IN BEFORE ADDING TO FAVS

  return (
    <div className="body">
      <div className="games_list">
        {game.map((game) => {
          const isFav = favorites.includes(game.id);
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
                  <button
                    className="btn btn-square btn_like"
                    onClick={() => toggleFavorite(game)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={isFav ? "red" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      className="size-[1.2em]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </button>
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
