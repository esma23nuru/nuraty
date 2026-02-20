import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import "bootstrap/dist/css/bootstrap.min.css"; // Hakikisha bootstrap imewekwa

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoadingPage(false), 800);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoadingBtn(true);

    try {
      const res = await axios.post("http://localhost:5000/api/login/", {
        login,
        password,
      });
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid login credentials");
    } finally {
      setLoadingBtn(false);
    }
  };

  if (loadingPage) return <Loader />;

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" 
         style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      
      <div className="card shadow-lg border-0" style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark">Welcome Back</h2>
            <p className="text-muted small">Please enter your details to sign in</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Input Email/Username */}
            <div className="form-group mb-3">
              <label className="form-label fw-semibold">Email or Username</label>
              <input
                type="text"
                className="form-control form-control-lg shadow-sm"
                placeholder="Enter email/username"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                style={{ fontSize: "0.95rem", borderRadius: "10px" }}
              />
            </div>

            {/* Input Password */}
            <div className="form-group mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control form-control-lg shadow-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ fontSize: "0.95rem", borderRadius: "10px" }}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" style={{ fontSize: "0.85rem", textDecoration: "none" }}>Forgot Password?</Link>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger py-2 px-3 small text-center mb-3" role="alert">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 shadow-sm fw-bold"
              disabled={loadingBtn}
              style={{
                borderRadius: "10px",
                background: "#667eea",
                border: "none"
              }}
            >
              {loadingBtn ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : "Login"}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-4">
            <p className="text-muted small">
              Don't have an account? <Link to="/register" className="fw-bold text-decoration-none">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
