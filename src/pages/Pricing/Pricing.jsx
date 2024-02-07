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
      return region.hospitals.some((hospital) => {
        return hospital.procedures.some((procedure) => {
          return procedure.procedure
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        });
      });
    });
  };

  const filteredRegionData = filterData(regionData);

  return (
    <div className="container px-5   mt-5" id="pricing">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4">Region-Specific Procedure Pricing</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a procedure"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          {filteredRegionData.map((region, index) => (
            <div key={index}>
              <h4 className="mt-3">{region.region}</h4>
              <ul className="list-group">
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
                          {procedure.procedure}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="col-md-6 bg-body-tertiary rounded px-4 ">
          {selectedProcedure && selectedHospital && (
            <div>
              <h3 className="mb-4">
                Price for {selectedProcedure} at {selectedHospital}
              </h3>
              <p>Region: {selectedHospital}</p>
              <p>Hospital: {selectedHospital}</p>
              <p>Procedure: {selectedProcedure}</p>
              <p>Price: ${procedurePrice}</p>
              {/* You can add more details or customize the display */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
