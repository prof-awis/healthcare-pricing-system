import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Form } from "react-bootstrap";

const PriceComparisonChart = ({ hospitals }) => {
  const [selectedHospitals, setSelectedHospitals] = useState([]);

  useEffect(() => {
    if (hospitals.length >= 2) {
      setSelectedHospitals([hospitals[0], hospitals[1]]);
    }
  }, [hospitals]);

  const handleSelectHospital = (index, event) => {
    const newSelectedHospitals = [...selectedHospitals];
    newSelectedHospitals[index] = hospitals.find(
      (hospital) => hospital.title === event.target.value
    );
    setSelectedHospitals(newSelectedHospitals);
  };

  const services =
    selectedHospitals.length >= 2
      ? [
          ...new Set(
            selectedHospitals.flatMap((hospital) =>
              hospital.services.map((service) => service.name)
            )
          ),
        ]
      : [];

  const data =
    selectedHospitals.length >= 2
      ? {
          labels: services,
          datasets: selectedHospitals.map((hospital, index) => ({
            label: hospital.title,
            data: services.map(
              (service) =>
                hospital.services.find((s) => s.name === service)?.price || 0
            ),
            backgroundColor:
              index === 0
                ? "rgba(75, 192, 192, 0.2)"
                : "rgba(255, 99, 132, 0.2)",
            borderColor:
              index === 0 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          })),
        }
      : {};

  return (
    <>
      {hospitals.map((hospital, index) => (
        <Form.Select
          key={index}
          aria-label={`Select hospital ${index + 1}`}
          onChange={(event) => handleSelectHospital(index, event)}
        >
          {hospitals.map((hospital, index) => (
            <option key={index}>{hospital.title}</option>
          ))}
        </Form.Select>
      ))}
      {selectedHospitals.length >= 2 && <Bar data={data} />}
    </>
  );
};

export default PriceComparisonChart;
