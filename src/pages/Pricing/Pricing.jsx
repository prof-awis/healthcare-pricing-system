import React, { useState, useEffect } from "react";

const Pricing = () => {
  const [regionData, setRegionData] = useState([]);
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [procedurePrice, setProcedurePrice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Assume there's a function to fetch region-specific hospital pricing data
  const fetchRegionData = () => {
    // Placeholder API or function to fetch region-specific hospital pricing data
    // Replace this with your actual API endpoint or data source
    // For simplicity, using a placeholder array here
    const placeholderData = [
      {
        region: "Nairobi",
        hospitals: [
          {
            name: "Hospital A",
            procedures: [
              { procedure: "MRI Scan", price: 5000 },
              { procedure: "X-Ray", price: 1000 },
              { procedure: "Blood Test", price: 300 },
              // Add more procedures as needed
            ],
          },
          // Add more hospitals in Nairobi as needed
        ],
      },
      {
        region: "Coast",
        hospitals: [
          {
            name: "Hospital B",
            procedures: [
              { procedure: "MRI Scan", price: 5500 },
              { procedure: "X-Ray", price: 1200 },
              { procedure: "Blood Test", price: 350 },
              // Add more procedures as needed
            ],
          },
          // Add more hospitals in Coast as needed
        ],
      },
      // Add more regions as needed
    ];

    setRegionData(placeholderData);
  };

  useEffect(() => {
    // Fetch region-specific hospital pricing data when the component mounts
    fetchRegionData();
  }, []);

  const handleProcedureSelect = (procedure, hospital, region) => {
    // Update the selected procedure, hospital, region, and its price
    setSelectedProcedure(procedure.procedure);
    setSelectedHospital(hospital.name);
    setProcedurePrice(procedure.price);
  };

  const handleSearchTermChange = (event) => {
    // Update the search term when the input changes
    setSearchTerm(event.target.value);
  };

  const filterData = (data) => {
    // Filter the data based on the search term
    return data.filter((region) => {
      // Filter region based on region name
      const regionMatch = region.region
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      // Filter hospitals based on hospital name and procedures
      const filteredHospitals = region.hospitals.filter((hospital) => {
        const hospitalMatch = hospital.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const procedureMatch = hospital.procedures.some((procedure) => {
          return procedure.procedure
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        });
        return hospitalMatch || procedureMatch;
      });
      return regionMatch || filteredHospitals.length > 0;
    });
  };

  const filteredRegionData = filterData(regionData);

  return (
    <div className="container px-5 mt-5" id="pricing">
      <h2 className="mb-4">Region-Specific Procedure Pricing</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a region or procedure"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      {filteredRegionData.map((region, index) => (
        <div key={index}>
          <h4 className="mt-3">{region.region}</h4>
          {region.hospitals.map((hospital, subIndex) => (
            <div key={subIndex}>
              <h5 className="mt-3">{hospital.name}</h5>
              <ul className="list-group">
                {hospital.procedures.map((procedure, innerIndex) => (
                  <li
                    key={innerIndex}
                    className={`list-group-item ${
                      selectedProcedure === procedure.procedure &&
                      selectedHospital === hospital.name
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleProcedureSelect(procedure, hospital, region)
                    }
                  >
                    <div
                      className="accordion"
                      id={`accordion-${index}-${subIndex}-${innerIndex}`}
                    >
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id={`heading-${index}-${subIndex}-${innerIndex}`}
                        >
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${index}-${subIndex}-${innerIndex}`}
                            aria-expanded="false"
                            aria-controls={`collapse-${index}-${subIndex}-${innerIndex}`}
                          >
                            {procedure.procedure}
                          </button>
                        </h2>
                        <div
                          id={`collapse-${index}-${subIndex}-${innerIndex}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`heading-${index}-${subIndex}-${innerIndex}`}
                          data-bs-parent={`#accordion-${index}-${subIndex}-${innerIndex}`}
                        >
                          <div className="accordion-body">
                            Price: ${procedure.price}
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
      ))}
    </div>
  );
};

export default Pricing;
