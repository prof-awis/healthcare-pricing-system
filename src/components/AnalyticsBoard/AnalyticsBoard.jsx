import React, { useState } from "react";
import { Table, Form, Row, Col } from "react-bootstrap";

const AnalyticsBoard = ({ hospitals }) => {
  const [selectedHospitals, setSelectedHospitals] = useState([null, null]);

  const handleSelectHospital = (index, event) => {
    const newSelectedHospitals = [...selectedHospitals];
    newSelectedHospitals[index] = hospitals.find(
      (hospital) => hospital.title === event.target.value
    );
    setSelectedHospitals(newSelectedHospitals);
  };

  return (
    <>
      <h1>Compare Prices for Services in Different Hospitals</h1>
      <Row>
        {[0, 1].map((index) => (
          <Col key={index}>
            <Form.Select
              aria-label={`Select hospital ${index + 1}`}
              onChange={(event) => handleSelectHospital(index, event)}
            >
              <option>Select a hospital</option>
              {hospitals.map((hospital, index) => (
                <option key={index}>{hospital.title}</option>
              ))}
            </Form.Select>
          </Col>
        ))}
      </Row>
      {selectedHospitals[0] && selectedHospitals[1] && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Service</th>
              {selectedHospitals.map((hospital, index) => (
                <th key={index}>{hospital.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedHospitals[0].services.map((service, index) => (
              <tr key={index}>
                <td>{service.name}</td>
                {selectedHospitals.map((hospital) => (
                  <td>
                    Kshs.
                    {hospital.services.find((s) => s.name === service.name)
                      ?.price || "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AnalyticsBoard;
