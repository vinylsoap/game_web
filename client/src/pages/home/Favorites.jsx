import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/Favorites.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/home/Navbar";
import "../../styles/Navbar.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`/api/favourites`, {
        withCredentials: true,
      });
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const toggleFavorite = async (gameId) => {
    try {
      await axios.delete(`/api/favourites/${gameId}`, {
        withCredentials: true,
      });
      setFavorites((prev) => prev.filter((game) => game.game_ig !== gameId));
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  if (favorites.length === 0) {
    return <p className="text-center">You dont have any favs yet!</p>;
  }

  return (
    <>
      <Navbar />
      <div className="body">
        <div className="games_list">
          {favorites.map((game) => {
            return (
              <div
                className="card bg-base-100 image-full w-96 shadow-sm"
                key={game.game_id}
              >
                <figure>
                  <img src={game.game_image} alt={game.game_title} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{game.game_title}</h2>
                  <div className="card-actions justify-end">
                    <Link to={`/games/${game.game_id}`}>
                      <button className="btn btn-primary btn_more">More</button>
                    </Link>
                    <button
                      onClick={() => toggleFavorite(game.game_id)}
                      className="btn btn-square btn_like"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
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
    </>
  );
}

export default Favorites;
