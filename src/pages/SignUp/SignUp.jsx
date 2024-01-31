import React, { useState } from "react";
import draw1 from "../../assets/images/draw1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "../../components";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("====================================");
    console.log(user);
    console.log("====================================");
    // Reset previous errors
    setError(null);

    // Step 1: Validate name field
    if (!user.name) {
      setError("Please enter your name.");
      return;
    }

    // Step 2: Validate email field
    if (!user.email) {
      setError("Please enter your email.");
      return;
    }

    // Step 3: Validate password field
    if (!user.password) {
      setError("Please enter a password.");
      return;
    }

    // Step 4: Validate repeat password field
    if (user.password !== user.repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // TODO: Call your authentication service to register the user with 'user' state
      // Example: const success = await authService.registerUser(user);

      // If registration is successful, you can redirect the user or perform other actions
      // Example: if (success) history.push('/dashboard');

      navigate("/");
      // For now, simulate an error
      throw new Error("Registration failed: Email already exists.");
    } catch (error) {
      setError(error.message);
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
                      Sign up
                    </p>

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="me-3 fa-fw fa-lg"
                        />
                        {/* <i className="fas fa-user fa-lg me-3 fa-fw"></i> */}
                        <div className="form-floating form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="floatingInput"
                            className="form-control shadow-none"
                            placeholder="Your Name"
                            name="name" // Add the 'name' attribute
                            value={user.name} // Ensure you're using the state value for 'value'
                            onChange={handleChange} // Add the 'onChange' event handler
                          />
                          <label
                            className="form-label text-info"
                            for="floatingInput"
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
                        {/* <i className="fas fa-envelope fa-lg me-3 fa-fw"></i> */}
                        <div className="form-floating form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="floatingInput"
                            className="form-control shadow-none"
                            placeholder="Your Email"
                            name="email" // Add the 'name' attribute
                            value={user.email} // Ensure you're using the state value for 'value'
                            onChange={handleChange} // Add the 'onChange' event handler
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
                            name="password" // Add the 'name' attribute
                            value={user.password} // Ensure you're using the state value for 'value'
                            onChange={handleChange} // Add the 'onChange' event handler
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
                        {/* <i className="fas fa-key fa-lg me-3 fa-fw"></i> */}
                        <div className="form-floating form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="floatingInput"
                            className="form-control shadow-none"
                            placeholder="Repeat Password"
                            name="repeatPassword" // Add the 'name' attribute
                            value={user.repeatPassword} // Ensure you're using the state value for 'value'
                            onChange={handleChange} // Add the 'onChange' event handler
                          />
                          <label
                            className="form-labelb text-info"
                            htmlFor="floatingInput"
                          >
                            Repeat your password
                          </label>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2 shadow-none"
                          type="checkbox"
                          value=""
                          id="form2Example3c"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary px-5 py-2 rounded-pill"
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
    </div>
  );
};

export default SignUp;
