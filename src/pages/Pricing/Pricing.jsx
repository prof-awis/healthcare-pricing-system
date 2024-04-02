import React, { useState, useEffect } from "react";
import {
  Accordion,
  Card,
  Button,
  Form,
  AccordionButton,
  AccordionBody,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { AnalAnalyticsBoard, PriceComparisonChart } from "../../components";

const Pricing = () => {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/hospitals")
      .then((response) => response.json())
      .then((data) => setHospitals(data))
      .catch((error) => console.error(error));
  }, []);

  const [activeKey, setActiveKey] = useState(null);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredHospitals = hospitals
    .map((hospital) => ({
      ...hospital,
      services: hospital.services.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(
      (hospital) =>
        hospital?.title?.toLowerCase().includes(search.toLowerCase()) ||
        hospital?.address?.toLowerCase().includes(search.toLowerCase()) ||
        hospital?.services?.length > 0
    );

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Form.Control
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            className="mb-3"
          />
          {/* <PriceComparisonChart hospitals={filteredHospitals} /> */}
          <AnalAnalyticsBoard hospitals={filteredHospitals} />
          <Accordion activeKey={activeKey}>
            {filteredHospitals.map((hospital, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>
                  <Button
                    variant="link"
                    onClick={() =>
                      setActiveKey(
                        activeKey !== index.toString() ? index.toString() : null
                      )
                    }
                  >
                    <div style={{ textDecoration: "none" }}>
                      <h5>{hospital.title}</h5>
                      <p>{hospital.address}</p>
                    </div>
                  </Button>
                </Accordion.Header>
                <Accordion.Body>
                  {hospital.services.map((service, serviceIndex) => (
                    <p key={serviceIndex}>
                      <strong>{service.name}:</strong> Kshs. {service.price}
                    </p>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Pricing;
