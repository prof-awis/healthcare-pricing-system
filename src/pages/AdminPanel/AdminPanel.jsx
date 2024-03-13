import React, { useState, useEffect } from "react";
import axios from "axios";
import { Footer, Navbar } from "../../components";

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
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Location:</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
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

          <div className="mb-3 col-12 col-sm-6 col-md-6  ">
            <label className="form-label">Procedures:</label>
            <select
              className="form-select"
              value={procedure}
              onChange={handleProcedureChange}
            >
              <option value="">Select Procedure</option>
              <option value="MRI Scan">MRI Scan</option>
              <option value="X-Ray">X-Ray</option>
              <option value="Blood Test">Blood Test</option>
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
                {procedure.procedure} - Kshs.{procedure.price}
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
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(hospital._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
