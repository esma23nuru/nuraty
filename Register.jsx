import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [userType, setUserType] = useState("individual");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    contact: "",
    email: "",
    company_name: "",
    tin_number: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/register/", {
        ...formData,
        user_type: userType
      });
      alert("✅ Registration successful!");
      navigator("/")
      // Reset form or navigate
    } catch (err) {
      setError(err.response?.data ? err.response.data.error : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center py-5" 
         style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      
      <div className="card shadow-lg border-0" style={{ width: "100%", maxWidth: "650px", borderRadius: "15px" }}>
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark">Create Account</h2>
            <p className="text-muted">Join us by filling in the details below</p>
          </div>

          {/* User Type Switcher */}
          <div className="d-flex justify-content-center mb-4">
            <div className="btn-group w-100" role="group" style={{ maxWidth: "300px" }}>
              <button
                type="button"
                className={`btn ${userType === "individual" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setUserType("individual")}
              >
                Individual
              </button>
              <button
                type="button"
                className={`btn ${userType === "company" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setUserType("company")}
              >
                Company
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Common Fields */}
              <div className="col-md-12">
                <label className="form-label fw-semibold small">Username</label>
                <input type="text" name="username" className="form-control" placeholder="Username" onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Password</label>
                <input type="password" name="password" className="form-control" placeholder="••••••••" onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Confirm Password</label>
                <input type="password" name="confirm_password" className="form-control" placeholder="••••••••" onChange={handleChange} required />
              </div>
              <div className="col-md-12">
                    <label className="form-label fw-semibold small">Email Address</label>
                    <input type="email" name="email" className="form-control" placeholder="info@example.com" onChange={handleChange} required />
                  </div>

              <hr className="my-3 text-muted" />

              {/* Conditional Fields: Individual */}
              {userType === "individual" && (
                <>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">First Name</label>
                    <input type="text" name="first_name" className="form-control" placeholder="First name" onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Last Name</label>
                    <input type="text" name="last_name" className="form-control" placeholder="Last name" onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Contact</label>
                    <input type="text" name="contact" className="form-control" placeholder="+255..." onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">TIN Number</label>
                    <input type="text" name="tin_number" className="form-control" placeholder="123-456-789" onChange={handleChange} required />
                  </div>
                </>
              )}

              {/* Conditional Fields: Company */}
              {userType === "company" && (
                <>
                  <div className="col-md-12">
                    <label className="form-label fw-semibold small">Company Name</label>
                    <input type="text" name="company_name" className="form-control" placeholder="Example LTD" onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">TIN Number</label>
                    <input type="text" name="tin_number" className="form-control" placeholder="987-654-321" onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Contact Person Number</label>
                    <input type="text" name="contact" className="form-control" placeholder="+255..." onChange={handleChange} required />
                  </div>
                </>
              )}
            </div>

            {error && (
              <div className="alert alert-danger mt-3 small border-0 shadow-sm" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 mt-4 shadow-sm fw-bold"
              disabled={loading}
              style={{ background: "#667eea", border: "none", borderRadius: "10px" }}
            >
              {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted small">
              Already have an account? <Link to="/" className="fw-bold text-decoration-none">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
