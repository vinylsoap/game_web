import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "../../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/check-session", {
          credentials: "include",
        });
        const data = await res.json();

        if (data.loggedIn) {
          setUsername(data.username);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogOut = async () => {
    try {
      await fetch("/logout", {
        method: "POST",
        credentials: "include",
      });

      navigate("/signup");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="left-side">
          <button className="btn btn-ghost" onClick={handleLogOut}>
            Log out
          </button>
        </div>
        <Link to={"/homepage"}>
          <div className="center">
            <button className="btn btn-ghost text-xl">Games</button>
          </div>
        </Link>
        <div className="right-side">
          <Link to={"/favourites"}>
            <button className="btn btn-ghost">Favorites</button>
          </Link>
          <div className="username-nav">
            {username ? (
              <p className="username-text">{username}</p>
            ) : (
              <Link to={"/signup"}>
                <button className="btn btn-ghost">Sign up or Log in!</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
