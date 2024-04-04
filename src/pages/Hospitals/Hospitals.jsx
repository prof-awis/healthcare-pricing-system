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
        <Col md="8">
          <h1>Hospitals Near You</h1>
          <Map onPointSelected={handlePointSelected} />
        </Col>{" "}
      </Row>
    </Container>
  );
};

export default Hospitals;
