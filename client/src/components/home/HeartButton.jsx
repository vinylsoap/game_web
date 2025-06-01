import { useState, useEffect } from "react";

function HeartButton({ gameId, isInitiallyFavorited, onToggle }) {
  const [isFavorited, setIsFavorited] = useState(isInitiallyFavorited);

  const toggleFavorite = async () => {
    try {
      const url = `/api/favourites/${gameId}`;
      const res = await fetch(isFavorited ? url : "/api/favourites", {
        method: isFavorited ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: isFavorited ? null : JSON.stringify({ game_id: gameId }),
      });

      if (res.ok) {
        setIsFavorited(!isFavorited);
        if (onToggle) onToggle(gameId);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to toggle favorite");
      }
    } catch (error) {
      console.error("Error:", err);
    }
  };

  return (
    <button className="btn btn-square" onClick={toggleFavorite}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isFavorited ? "red" : "none"}
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
  );
}

export default HeartButton;
