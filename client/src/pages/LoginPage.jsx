import { useState } from "react";
import api from "../api/axiosClient";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
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
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));

      setSuccess("Welcome back! You’re now logged in.");
      navigate("/products");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login to your account</h2>
        <p className="auth-subtitle">
          Access your saved cart, re-order past demo purchases, and experience
          the full backend flow.
        </p>

        <form onSubmit={handleSubmit}>
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
            <p className="helper-text">
              Use the same email you used while registering for this demo store.
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Signing you in..." : "Login"}
          </button>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
        </form>

        <p className="auth-footer-text">
          New to Pasovit Clothing?{" "}
          <Link to="/register" className="link-inline">
            Create your account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
