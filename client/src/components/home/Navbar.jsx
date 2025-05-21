import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

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
        <div className="center">
          <a className="btn btn-ghost text-xl">Games</a>
        </div>
        <div className="right-side">
          <Link to={"/favourites"}>
            <button className="btn btn-ghost">Favorites</button>
          </Link>
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
