import React from "react";
import draw1 from "../../assets/images/draw1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Footer } from "../../components";

const Login = () => {

  const loginHandler = async () => {
    try {
      // Define the login credentials
      const credentials = {
        username: "example_username",
        password: "example_password",
      };

      // Make a POST request to the login endpoint
      const response = await fetch("http://localhost:5050/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Parse the response JSON data
        const data = await response.json();
        console.log("Login successful:", data);

        // Optionally, you can redirect the user to another page
        // window.location.href = '/dashboard';
      } else {
        // Handle error response (status code 4xx or 5xx)
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        // Display error message to the user
        // Example: setError('Invalid username or password');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error:", error.message);
      // Display error message to the user
      // Example: setError('An unexpected error occurred');
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
                        {/* <i className="fas fa-envelope fa-lg me-3 fa-fw"></i> */}
                        <div className="form-floating form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="floatingInput"
                            className="form-control shadow-none"
                            placeholder="Your Email"
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
                        {/* <i className="fas fa-lock fa-lg me-3 fa-fw"></i> */}
                        <div className="form-floating form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="floatingInput"
                            className="form-control shadow-none"
                            placeholder="Your Password"
                          />
                          <label
                            className="form-label text-info"
                            htmlFor="floatingInput"
                          >
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-4">
                        <label className="form-check-label text-info">
                          Forgot your password?
                          {/* <a href="#!">Forgot your password?</a> */}
                        </label>
                      </div>

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
                      // srcset=""
                      className="img-fluid"
                    />
                    {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    className="img-fluid" alt="Sample image"> */}
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
