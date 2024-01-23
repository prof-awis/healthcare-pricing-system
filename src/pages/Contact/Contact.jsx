// Contact.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Contact = () => {
  return (
    <div className="container-fluid p-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h2 className="text-center mb-4">Contact Us</h2>
          <p className="text-center">
            We'd love to hear from you! If you have any questions, feedback, or
            inquiries, feel free to reach out to us.
          </p>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Email:</strong> info@mediprice.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +254 123 456 789
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Healthcare Street, Nairobi,
                    Kenya
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    Feel free to use the form below to send us a message, and
                    we'll get back to you as soon as possible.
                  </p>
                  {/* Add a contact form if needed */}
                  <form>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows="4"
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
