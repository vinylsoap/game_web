import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import "../../styles/Login.css";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "/api/users/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      navigate("/homepage");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Wrong username or password");
    }
  };

  return (
    <div className="container">
      <div className="login-page">
        <div className="title">
          <h2>Log in!</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-fields">
            <div className="username">
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
                placeholder="username"
                className="input input-primary"
              />
            </div>

            <div className="password">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="password"
                className="input input-primary"
              />
            </div>
          </div>
          {errorMsg && <p className="error">{errorMsg}</p>}
          <div className="login-btn">
            <button
              type="submit"
              className="btn login-btn-inner btn-outline btn-primary"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
