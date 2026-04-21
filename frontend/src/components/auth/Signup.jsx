import React, { useState } from "react";
import { useAuth } from "../../authContext";
import { useNavigate } from "react-router-dom";
import githubMark from "../../assets/github-mark-white.svg";
import "./auth.css";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/signup", { username: name, email, password });
      localStorage.setItem("token", res.data.token);
      if (res.data.userId) {
          localStorage.setItem("userId", res.data.userId);
          setCurrentUser(res.data.userId);
          navigate("/");
      } else {
          navigate("/auth");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="login-wrapper">
    <div className="login-logo-container">
      <img src={githubMark} alt="GitHub" className="logo-login" />
    </div>
    <div className="login-box-wrapper">
      <div className="login-box">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
      <div className="pass-box">
        <p>
          Already have an account?{" "}
          <span className="signup" onClick={() => navigate("/auth")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  </div>
);
};

export default Signup;