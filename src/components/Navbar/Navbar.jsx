import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check authentication status and role here
    // Example: Fetch user data from localStorage or context
    const userData = localStorage.getItem("userData");
    if (userData) {
      const { role } = JSON.parse(userData);
      setIsLoggedIn(true);
      setIsAdmin(role === "admin");
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-info px-md-5 sticky-top mb-5 ">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold " to="/">
          MediPrice
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
            )}
            {isLoggedIn && !isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            )}
            {isLoggedIn && isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/Admin">
                  Admin
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="#about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Hospitals">
                Hospitals Near me
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">
                Blog
              </Link>
            </li>
            
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/Signup">
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
