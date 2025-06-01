import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeartButton from "../../components/home/HeartButton";
import Navbar from "../../components/home/Navbar";
import "../../styles/Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await fetch("/api/favourites", {
        credentials: "include",
      });
      const data = await res.json();
      setFavorites(data);
    };

    fetchFavorites();
  }, []);

  const handleRemove = (gameId) => {
    setFavorites((prev) => prev.filter((g) => g.game_id !== gameId));
  };

  return (
    <div className="body-favs">
      <Navbar />

      <div className="no-favs-div">
        {favorites.length === 0 ? (
          <h2 className="no-favs">Empty...</h2>
        ) : (
          <h2 className="have-favs">Your favs!</h2>
        )}
      </div>
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
                  <HeartButton
                    gameId={game.game_id}
                    isInitiallyFavorited={true}
                    onToggle={handleRemove}
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

export default Favorites;
