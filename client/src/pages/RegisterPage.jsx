

import { useState } from "react";
import api from "../api/axiosClient";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", { name, email, password });
      const { token, user } = res.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));

      setSuccess("Account created successfully! Redirecting to products...");
      navigate("/products");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">
          Save your cart, place mock orders, and see how the backend handles
          real-world e-commerce flows.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full name</label>
            <input
              type="text"
              className="input"
              placeholder="Ali Raza"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="At least 6 characters"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="helper-text">
              Example: <code>Ali@12345</code> &mdash; just remember it for
              login.
            </p>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
        </form>

        <p className="auth-footer-text">
          Already registered?{" "}
          <Link to="/login" className="link-inline">
            Login instead
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
