import React, { useState, useEffect } from "react";
import axios from "axios";
import { Footer, Map, Navbar } from "../../components";
import { Modal, Button, Form } from "react-bootstrap";

const AdminPanel = () => {
  const userData = localStorage.getItem("userData");
  const { accessToken } = JSON.parse(userData);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    procedures: [],
    position: "",
    title: "",
    link: "",
    address: "",
    rating: "",
    reviews: "",
    price: "",
    category: "",
    opening_hours: "",
    phone: "",
  });
  const [procedure, setProcedure] = useState("");
  const [price, setPrice] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get("http://localhost:5050/hospitals");
      console.log(response.data);
      setHospitals(response.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProcedureChange = (e) => {
    setProcedure(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleAddProcedure = () => {
    if (procedure && price) {
      setFormData({
        ...formData,
        procedures: [...formData.procedures, { name: procedure, price }],
      });
      setProcedure("");
      setPrice("");
    }
  };

  const handleDeleteProcedure = (index) => {
    const updatedProcedures = [...formData.procedures];
    updatedProcedures.splice(index, 1);
    setFormData({ ...formData, procedures: updatedProcedures });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { ...formData, services: formData.procedures };

      const response = await axios.post(
        "http://localhost:5050/hospitals/new",
        data,
        {
          headers: {
            "Content-Type": "application/json", // Example header
            Authorization: "Bearer " + accessToken,
            // Add more headers as needed
          },
        }
      );
      // Prepend the new hospital to the hospitals array
      setHospitals([response.data, ...hospitals]);
      setFormData({
        name: "",
        location: "",
        procedures: [],
        position: "",
        title: "",
        link: "",
        address: "",
        rating: "",
        reviews: "",
        price: "",
        category: "",
        opening_hours: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error adding hospital:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/hospitals/${id}`, {
        headers: {
          "Content-Type": "application/json", // Example header
          Authorization: "Bearer " + accessToken,
          // Add more headers as needed
        },
      });
      setHospitals(hospitals.filter((hospital) => hospital._id !== id));
    } catch (error) {
      console.error("Error deleting hospital:", error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [currentHospital, setCurrentHospital] = useState({
    title: "",
    link: "",
    address: "",
    rating: "",
    reviews: "",
    price: "",
    category: "",
    opening_hours: "",
    phone: "",
    services: [],
  });

  const handleEdit = (hospital) => {
    setCurrentHospital(hospital);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    setCurrentHospital({
      ...currentHospital,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveChanges = async () => {
    console.log(accessToken); // Log the accessToken
    try {
      const response = await axios.put(
        `http://localhost:5050/hospitals/${currentHospital._id}`,
        currentHospital,
        {
          headers: {
            "Content-Type": "application/json", // Example header
            Authorization: "Bearer " + accessToken,
            // Add more headers as needed
          },
          // currentHospital
        }
      );
      // Update the hospitals list
      // ...
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Hnadling Services
  const handleServiceChange = (index, event) => {
    const newServices = [...currentHospital.services];
    newServices[index][event.target.name] = event.target.value;
    setCurrentHospital({
      ...currentHospital,
      services: newServices,
    });
  };

  const handleAddService = () => {
    setCurrentHospital({
      ...currentHospital,
      services: [...currentHospital.services, { name: "", price: "" }],
    });
  };

  const handleRemoveService = (index) => {
    const newServices = [...currentHospital.services];
    newServices.splice(index, 1);
    setCurrentHospital({
      ...currentHospital,
      services: newServices,
    });
  };

  //fetching hospitals for the map
  useEffect(() => {
    const fetchHospitals = async () => {
      const response = await axios.get("http://localhost:5050/hospitals");
      setHospitals(response.data);
    };

    fetchHospitals();
  }, []);

  //displaying the sevices list
  useEffect(() => {
    fetch("http://localhost:5050/hospitals")
      .then((response) => response.json())
      .then((hospitals) => {
        const allServices = hospitals.flatMap((hospital) => hospital.services);
        const uniqueServices = Array.from(
          new Set(allServices.map((service) => service.name))
        ).map((name) => {
          return allServices.find((service) => service.name === name);
        });
        setServices(uniqueServices);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Add Hospital</h2>
        <form
          onSubmit={handleSubmit}
          className="row row-cols-2 row-cols-sm-4 row-cols-md-6  "
        >
          <div className="mb-3">
            <label className="form-label">Position:</label>
            <input
              type="number"
              className="form-control"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Link:</label>
            <input
              type="text"
              className="form-control"
              name="link"
              value={formData.link}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address:</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Rating:</label>
            <input
              type="number"
              className="form-control"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Reviews:</label>
            <input
              type="number"
              className="form-control"
              name="reviews"
              value={formData.reviews}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price:</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category:</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Opening Hours:</label>
            <input
              type="text"
              className="form-control"
              name="opening_hours"
              value={formData.opening_hours}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone:</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 col-12 col-sm-6 col-md-6  form-group">
            {/* <label className="form-label">Procedures:</label>
            <select
              className="form-select"
              value={procedure}
              onChange={handleProcedureChange}
            >
              <option value="">Select Procedure</option>
              <option value="MRI Scan">MRI Scan</option>
              <option value="X-Ray">X-Ray</option>
              <option value="Blood Test">Blood Test</option>
            </select> */}
            <label htmlFor="procedure">Procedure</label>
            <select
              id="procedure"
              className="form-control"
              value={procedure}
              onChange={handleProcedureChange}
            >
              <option value="">Select a service</option>
              {services.map((service, index) => (
                <option key={index} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Price"
              value={price}
              onChange={handlePriceChange}
            />
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={handleAddProcedure}
            >
              Add Procedure
            </button>
          </div>
          <ul className="list-group mb-3 col-12 col-sm-6 col-md-6">
            {formData.procedures.map((procedure, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {procedure.name} - Kshs.{procedure.price}
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteProcedure(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className="btn btn-primary col-12 col-sm-3 col-md-4"
          >
            Add Hospital
          </button>
        </form>
        <h2>Hospitals</h2>
        <ul className="list-group">
          {hospitals.map((hospital) => (
            <li
              key={hospital._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {hospital.title} - {hospital.address}
              <div>
                <button
                  className="btn btn-primary btn-sm ml-2"
                  onClick={() => handleEdit(hospital)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(hospital._id)}
                >
                  Delete
                </button>{" "}
              </div>
            </li>
          ))}
        </ul>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Hospital</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formHospitalTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={currentHospital.title}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formHospitalLink">
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="text"
                  name="link"
                  value={currentHospital.link}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formHospitalAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={currentHospital.address}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formHospitalRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  name="rating"
                  value={currentHospital.rating}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formHospitalReviews">
                <Form.Label>Reviews</Form.Label>
                <Form.Control
                  type="number"
                  name="reviews"
                  value={currentHospital.reviews}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formHospitalPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={currentHospital.price}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formHospitalCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={currentHospital.category}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formHospitalOpeningHours">
                <Form.Label>Opening Hours</Form.Label>
                <Form.Control
                  type="text"
                  name="opening_hours"
                  value={currentHospital.opening_hours}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formHospitalPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={currentHospital.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>

              {/* Adding a separate form to handle the services array */}
              {currentHospital.services.map((service, index) => (
                <div key={index}>
                  <Form.Group controlId={`formHospitalServiceName${index}`}>
                    <Form.Label>Service Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={service.name}
                      onChange={(event) => handleServiceChange(index, event)}
                    />
                  </Form.Group>

                  <Form.Group controlId={`formHospitalServicePrice${index}`}>
                    <Form.Label>Service Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={service.price}
                      onChange={(event) => handleServiceChange(index, event)}
                    />
                  </Form.Group>

                  <Button
                    variant="danger"
                    onClick={() => handleRemoveService(index)}
                  >
                    Remove Service
                  </Button>
                </div>
              ))}

              <Button variant="primary" onClick={handleAddService}>
                Add Service
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        {/* <Map hospitals={hospitals} /> */}
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
