import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Map } from "../../components";

const Hospitals = () => {
  const handlePointSelected = (coordinates) => {
    setLocation(coordinates);
  };
  return (
    <Container>
      <Row>
        <h1 className="text-center py-4">Hospitals Near You</h1>
        <Col md="8" className="justify-content-center align-items-center ">
          <Map onPointSelected={handlePointSelected} />
        </Col>{" "}
      </Row>
    </Container>
  );
};

export default Hospitals;
