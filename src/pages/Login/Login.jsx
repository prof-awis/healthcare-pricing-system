import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import draw1 from "../../assets/images/draw1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Footer } from "../../components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const response = await fetch("http://localhost:5050/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful login (e.g., store token and redirect)
        console.log("Login successful:", data);

        // Redirect user to the dashboard page
        navigate("/"); // Redirect to the dashboard route
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="min-vh-100 bg-secondary">
      <Navbar />
      <div className="container h-100 p-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black rounded">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Welcome Back!
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="me-3 fa-fw fa-lg"
                        />
                        <div className="form-floating form-outline flex-fill mb-0">
                          <input
                            type="email"
                            className="form-control shadow-none"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label className="form-label text-info">
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon
                          icon={faLock}
                          className="me-3 fa-fw fa-lg"
                        />
                        <div className="form-floating form-outline flex-fill mb-0">
                          <input
                            type="password"
                            className="form-control shadow-none"
                            placeholder="Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label className="form-label text-info">
                            Password
                          </label>
                        </div>
                      </div>

                      {error && (
                        <div className="alert alert-danger">{error}</div>
                      )}

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary px-5 py-2 rounded-pill"
                          onClick={loginHandler}
                        >
                          Login
                        </button>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-4">
                        <label className="form-check-label">
                          Don't have an account?
                          <a href="/SignUp" className="px-2">
                            Sign Up
                          </a>
                        </label>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={draw1}
                      alt="sample Patient"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
