// Contact.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Contact = () => {
  return (
    <div className="container-fluid p-5 " id="contact">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h2 className="text-center mb-4">Contact Us</h2>
          <p className="text-center">
            We'd love to hear from you! If you have any questions, feedback, or
            inquiries, feel free to reach out to us.
          </p>
          <div className="card bg-body-secondary ">
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
                  <form className="g-3 ">
                    <div className="form-group">
                      <label htmlFor="name" className="text-info">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control shadow-none "
                        id="name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="text-info">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control shadow-none "
                        id="email"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="text-info">
                        Message
                      </label>
                      <textarea
                        className="form-control shadow-none "
                        id="message"
                        rows="4"
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary my-3 ">
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
