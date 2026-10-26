import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function Signup() {
  const [form, setForm] = useState({
    contact: "",
    fullName: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const isDisabled =
    !form.contact.trim() ||
    !form.fullName.trim() ||
    !form.username.trim() ||
    form.password.length < 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/feed");
  };

  return (
    <div className="su-page">
      <div className="su-box">
        <h1 className="su-logo">Instagram</h1>
        <p className="su-subtitle">
          Sign up to see photos and videos from your friends.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="contact"
            placeholder="Mobile number or email"
            value={form.contact}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={form.fullName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />

          <p className="su-terms">
            By signing up, you agree to our Terms, Privacy Policy and Cookies
            Policy.
          </p>

          <button type="submit" disabled={isDisabled}>
            Sign up
          </button>
        </form>
      </div>

      <div className="su-footer-box">
        Have an account? <Link to="/">Log in</Link>
      </div>
    </div>
  );
}

export default Signup;
