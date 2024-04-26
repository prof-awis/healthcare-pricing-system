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
  Pagination,
} from "react-bootstrap";
import {
  AnalAnalyticsBoard,
  Map,
  PriceComparisonChart,
} from "../../components";

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
const Pricing = () => {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const hospitalsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:5050/hospitals")
      .then((response) => response.json())
      .then((data) => {
        const hospitalsWithDistance = data.map((hospital) => {
          const distance = getDistanceFromLatLonInKm(
            location?.coordinates[0],
            location?.coordinates[1],
            hospital?.location.coordinates[0],
            hospital?.location.coordinates[1]
          );
          return { ...hospital, distance };
        });
        setHospitals(hospitalsWithDistance);
      })
      .catch((error) => console.error(error));
  }, [location]);

  useEffect(() => {
    fetch("http://localhost:5050/hospitals")
      .then((response) => response.json())
      .then((data) => {
        setHospitals(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const [activeKey, setActiveKey] = useState(null);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredHospitals = hospitals
    .map((hospital) => ({
      ...hospital,
      services:
        hospital.title.toLowerCase().includes(search.toLowerCase()) ||
        hospital.address.toLowerCase().includes(search.toLowerCase())
          ? hospital.services
          : hospital.services.filter((service) =>
              service.name.toLowerCase().includes(search.toLowerCase())
            ),
    }))
    .filter(
      (hospital) =>
        hospital.title.toLowerCase().includes(search.toLowerCase()) ||
        hospital.address.toLowerCase().includes(search.toLowerCase()) ||
        hospital.services.length > 0
    );

  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = filteredHospitals.slice(
    indexOfFirstHospital,
    indexOfLastHospital
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Row className="justify-content-center align-items-center ">
        <h1 className="text-center py-4 ">Hospitals Profiles</h1>
        <Col md="8">
          <Form.Control
            type="text"
            placeholder="Search by hospital name, address, or service name"
            value={search}
            onChange={handleSearch}
            className="mb-3 shadow-none "
          />
          <Accordion activeKey={activeKey}>
            {currentHospitals.map((hospital, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header className="d-flex justify-content-center ">
                  <Button
                    variant="link"
                    onClick={() =>
                      setActiveKey(
                        activeKey !== index.toString() ? index.toString() : null
                      )
                    }
                    className="w-100 shadow-none text-decoration-none"
                  >
                    <div className="text-decoration-none  ">
                      <h5 className="text-decoration-none ">
                        {hospital.title}
                      </h5>
                      <p>{hospital.address}</p>
                      <p className="fst-italic "> Click to see more</p>
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
      <Row className="justify-content-md-center py-2 ">
        <Col md="8">
          <div style={{ overflowX: "auto", maxWidth: "100%" }}>
            <Pagination>
              {Array.from(
                {
                  length: Math.ceil(
                    filteredHospitals.length / hospitalsPerPage
                  ),
                },
                (_, i) => i + 1
              ).map((number) => (
                <Pagination.Item
                  key={number}
                  active={currentPage === number}
                  onClick={() => paginate(number)}
                >
                  {number}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-md-center py-4 ">
        <Col md="8">
          {/* <PriceComparisonChart hospitals={filteredHospitals} /> */}
          <AnalAnalyticsBoard hospitals={filteredHospitals} />
        </Col>
      </Row>
    </Container>
  );
};

export default Pricing;
