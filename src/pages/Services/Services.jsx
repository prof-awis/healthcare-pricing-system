import React from "react";

const Services = () => {
  const servicesData = [
    {
      title: "Procedure Transparency",
      description:
        "Access detailed pricing information for a wide range of medical procedures from various hospitals.",
      icon: "fa-eye",
    },
    {
      title: "User-Friendly Interface",
      description:
        "Navigate our platform effortlessly with a user-friendly interface designed for all users.",
      icon: "fa-desktop",
    },
    {
      title: "Hospital-Specific Pricing",
      description:
        "Explore hospital-specific pricing to make informed decisions based on your preferences and needs.",
      icon: "fa-hospital",
    },
    {
      title: "Region-Specific Data",
      description:
        "Discover pricing information tailored to specific regions, ensuring accuracy and relevance.",
      icon: "fa-globe",
    },
    // Add more services as needed
  ];

  return (
    <div className="container-fluid mt-5 bg-info ">
      <h2 className="text-center mb-4 pt-5">Our Services</h2>
      <div className="row">
        {servicesData.map((service, index) => (
          <div key={index} className="col-md-6 col-lg-3 mb-4 p-4">
            <div className="card shadow-lg p-4  ">
              <div className="card-body text-center">
                <i
                  className={`fas ${service.icon} fa-3x mb-3`}
                  style={{ color: "#007BFF" }}
                ></i>
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
