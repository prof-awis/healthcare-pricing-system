import React from "react";
import { Navbar } from "../../components";
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
          <div className="col p-5 ">
            <p>Welcome to MediPrice</p>
            <h1>Take Care of your health now</h1>

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
    </div>
  );
};

export default Dashboard;
