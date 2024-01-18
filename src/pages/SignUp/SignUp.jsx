import React from "react";
import draw1 from "../../assets/images/draw1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
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
                        {/* <i className="fas fa-user fa-lg me-3 fa-fw"></i> */}
                        <div className="form-floating form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="floatingInput"
                            className="form-control shadow-none"
                            placeholder="Your Name"
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

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
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
