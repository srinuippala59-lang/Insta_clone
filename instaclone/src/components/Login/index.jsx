import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import "./index.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(username.trim(), password);
      localStorage.setItem("token", data.accessToken || data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/feed"); // only runs if the credentials were correct
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Network error. Check your internet connection."
          : err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = username.trim() === "" || password.length < 6 || loading;

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="logo">Instagram</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Phone number, username, or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={isDisabled}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {error && <p className="login-error">{error}</p>}

        <div className="divider">
          <span></span>
          <p>OR</p>
          <span></span>
        </div>
        <p className="forgot">Forgot password?</p>
        <p className="login-hint">Demo login: emilys / emilyspass</p>
      </div>
      <div className="signup-box">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
