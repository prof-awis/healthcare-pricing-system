import React, { useState, useEffect } from "react";

const Pricing = () => {
  const [hospitalData, setHospitalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await fetch("http://localhost:5050/hospitals");
        if (response.ok) {
          const data = await response.json();
          setHospitalData(data);
        } else {
          console.error("Failed to fetch hospital data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchHospitalData();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterData = () => {
    return hospitalData.filter((hospital) => {
      return (
        hospital.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.services.some((service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });
  };

  const filteredHospitalData = filterData();

  return (
    <div className="container px-5 mt-5" id="pricing">
      <h2 className="mb-4">Hospital Pricing</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a hospital, address, or service"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      {filteredHospitalData.map((hospital) => (
        <div key={hospital._id}>
          <h4 className="mt-3">{hospital.title}</h4>
          <p>{hospital.address}</p>
          <ul className="list-group">
            {hospital.services.map((service, index) => (
              <li key={index} className="list-group-item">
                <div className="accordion" id={`accordion-${index}`}>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id={`heading-${index}`}>
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${index}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${index}`}
                      >
                        {service.name}
                      </button>
                    </h2>
                    <div
                      id={`collapse-${index}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading-${index}`}
                      data-bs-parent={`#accordion-${index}`}
                    >
                      <div className="accordion-body">
                        Price: ${service.price}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Pricing;
