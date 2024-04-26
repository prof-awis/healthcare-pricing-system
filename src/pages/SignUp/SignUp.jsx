import React, { useState } from "react";
import draw1 from "../../assets/images/draw1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faLock,
  faUser,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Footer } from "../../components";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    role: "user", // Default role is set to "user"
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const signupHandler = async () => {
    try {
      const response = await fetch("http://localhost:5050/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.name,
          email: user.email,
          password: user.password,
          repass: user.repeatPassword,
          role: user.role, // Include the selected role in the request body
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Sign-up successful:", data);
        // Optionally, you can redirect the user to another page
        // window.location.href = '/dashboard';
      } else {
        const errorData = await response.json();
        console.error("Sign-up failed:", errorData);
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="min-vh-100 bg-secondary">
      <div className="container h-100 p-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black rounded">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="me-3 fa-fw fa-lg"
                        />
                        <div className="form-floating form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="floatingInput"
                            className="form-control shadow-none"
                            placeholder="Your Name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                          />
                          <label
                            className="form-label text-info"
                            htmlFor="floatingInput"
                          >
                            Your Name
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="me-3 fa-fw fa-lg"
                        />
                        <div className="form-floating form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="floatingInput"
                            className="form-control shadow-none"
                            placeholder="Your Email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                          />
                          <label
                            className="form-label text-info"
                            htmlFor="floatingInput"
                          >
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
                            id="floatingInput"
                            className="form-control shadow-none"
                            placeholder="Your Password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                          />
                          <label
                            className="form-label text-info"
                            htmlFor="floatingInput"
                          >
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon
                          icon={faKey}
                          className="me-3 fa-fw fa-lg"
                        />
                        <div className="form-floating form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="floatingInput"
                            className="form-control shadow-none"
                            placeholder="Repeat Password"
                            name="repeatPassword"
                            value={user.repeatPassword}
                            onChange={handleChange}
                          />
                          <label
                            className="form-labelb text-info"
                            htmlFor="floatingInput"
                          >
                            Repeat your password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon
                          icon={faUserCog}
                          className="me-3 fa-fw fa-lg"
                        />{" "}
                        <div className="form-floating form-outline flex-fill mb-0">
                          <label className="me-3 mb-0 text-info ">Role:</label>
                          <select
                            name="role"
                            className="form-select shadow-none mt-3"
                            value={user.role}
                            onChange={handleChange}
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </div>

                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary px-5 py-2 rounded-pill"
                          onClick={signupHandler}
                        >
                          Sign Up
                        </button>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-4">
                        <label className="form-check-label">
                          Already have an account?
                          <a href="/Login" className="px-2">
                            Login
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
    </div>
  );
};

export default SignUp;
