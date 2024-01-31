import React from "react";
import { Footer, Navbar } from "../../components";
import doctor from "../../assets/images/doctor.jpg";
import About from "../About/About";
import Pricing from "../Pricing/Pricing";
import Services from "../Services/Services";
import Contact from "../Contact/Contact";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col p-5 text-center ">
            <h5 className="font-monospace text-info mb-4">
              Welcome to MediPrice
            </h5>
            <h1 className="mb-4">Take Care of your health now</h1>

            <p className=" text-secondary py-2 ">
              Your go-to platform for transparent healthcare pricing. Explore
              and compare pricing information from various hospitals, make
              informed decisions about medical procedures, and stay in control
              of your healthcare costs.
            </p>
            <p className="text-secondary py-2 ">
              Use the navigation buttons above to access different features,
              including pricing aggregation, user-friendly services, and
              personalized account management.
            </p>

            <button
              type="button"
              className="btn btn-info px-5 py-2 rounded-pill"
            >
              Contact Us
            </button>
          </div>
          <div className="col p-5 ">
            <img
              src={doctor}
              alt="ex doctor"
              srcset=""
              className="img-fluid rounded-4 shadow-lg "
            />
          </div>
        </div>
      </div>
      <About />
      <Pricing />
      <Services />
      <Contact />
      {/* <Blog /> */}
      <Footer />
    </div>
  );
};

export default Dashboard;
