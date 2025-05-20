import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/SignUp.css";

function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccsessMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccsessMsg("");

    try {
      const response = await axios.post(
        "/api/users/register",
        { username, password },
        { withCredentials: true }
      );

      setSuccsessMsg("Account created! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMsg(
        error.response?.data?.error ||
          "Something went wrong during registration"
      );
    }
  };

  return (
    <div className="container">
      <div className="signup-page">
        <div className="title">
          <h2>Create an Account</h2>
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
          {successMsg && <p className="succsess">{successMsg}</p>}
          <div className="submit-btn">
            <button
              type="submit"
              className="btn submit-btn-inner btn-outline btn-primary"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="login-btn">
          <p>Already have an account?</p>
          <a href="/login">
            <button
              type="submit"
              className="btn login-btn-inner btn-outline btn-primary"
            >
              Log in
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
