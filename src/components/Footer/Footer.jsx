import React from "react";

const Footer = () => {
  return (
    <footer className="bg-info text-dark py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: info@mediprice.com</p>
            <p>Phone: +254 123 456 789</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="nav-item">
                <a href="/" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item ">
                <a href="#services" className="nav-link ">
                  Services
                </a>
              </li>
              <li className="nav-item ">
                <a href="#about" className="nav-link ">
                  About Us
                </a>
              </li>
              <li className="nav-item ">
                <a href="#contact" className="nav-link ">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li className="nav-item ">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link "
                >
                  Facebook
                </a>
              </li>
              <li className="nav-item ">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  Twitter
                </a>
              </li>
              <li className="nav-item ">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <p className="text-center">
          &copy; 2024 MediPrice. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
