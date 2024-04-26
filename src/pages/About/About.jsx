import React from "react";
import robot from "../../assets/images/robot.jpg";

const About = () => {
  return (
    <div className="container-fluid border-bottom border-top  bg-info " id="about">
      <div className="row">
      <h2 className="text-center pt-5  px-3">About MediPrice</h2>

        <div className="col-md-4 mx-auto d-flex   align-items-center p-5">
          <img
            src={robot}
            alt="ex doctor"
            srcset=""
            className="img-fluid rounded shadow-lg "
          />
        </div>
        <div className="col-md-8 mx-auto px-5 pb-5">
          <p>
            Welcome to MediPrice, where we are committed to revolutionizing the
            healthcare experience for NHIF cardholders in Kenya. Our platform is
            designed to address the longstanding issue of transparency in
            healthcare pricing, empowering you to make well-informed decisions
            about your medical care.
          </p>
          <p>
            At MediPrice, we understand the challenges faced by NHIF cardholders
            in navigating the complex landscape of healthcare costs. It has been
            our mission to create a user-friendly and accessible platform that
            aggregates pricing data from various hospitals, putting the power
            back in your hands.
          </p>
          <p>
            Our comprehensive database includes pricing information for a wide
            range of medical procedures and treatments. Whether you are seeking
            information on routine check-ups, specialized surgeries, or
            diagnostic tests, MediPrice is your go-to resource.
          </p>
          <p>
            What sets us apart is our commitment to transparency and user
            satisfaction. We believe that every individual has the right to
            understand and compare healthcare costs, enabling them to choose the
            best options for their health and well-being.
          </p>
          <p>
            Our user-friendly interface ensures that you can effortlessly
            search, filter, and find the information you need. Whether you are
            planning for an upcoming medical procedure or simply curious about
            healthcare costs, MediPrice is here to serve you.
          </p>
          <p>
            Thank you for choosing MediPrice. We are dedicated to continuous
            improvement, and your feedback is invaluable. Together, let's build
            a healthcare system that is transparent, accessible, and focused on
            your needs.
          </p>
          <p>
            Explore MediPrice today and take control of your healthcare journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
