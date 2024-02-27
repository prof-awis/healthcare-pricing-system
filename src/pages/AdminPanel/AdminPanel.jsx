import React, { useState, useEffect } from "react";
import axios from "axios";
import { Footer, Navbar } from "../../components";

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    procedures: [],
  });
  const [procedure, setProcedure] = useState("");
  const [price, setPrice] = useState("");
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get("/api/hospitals");
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
        procedures: [...formData.procedures, { procedure, price }],
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
      const response = await axios.post("/api/hospital", formData);
      setHospitals([...hospitals, response.data]);
      setFormData({ name: "", location: "", procedures: [] });
    } catch (error) {
      console.error("Error adding hospital:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/hospital/${id}`);
      setHospitals(hospitals.filter((hospital) => hospital._id !== id));
    } catch (error) {
      console.error("Error deleting hospital:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Add Hospital</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Procedures:
          <select value={procedure} onChange={handleProcedureChange}>
            <option value="">Select Procedure</option>
            <option value="MRI Scan">MRI Scan</option>
            <option value="X-Ray">X-Ray</option>
            <option value="Blood Test">Blood Test</option>
          </select>
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={handlePriceChange}
          />
          <button type="button" onClick={handleAddProcedure}>
            Add Procedure
          </button>
        </label>
        <ul>
          {formData.procedures.map((procedure, index) => (
            <li key={index}>
              {procedure.procedure} - ${procedure.price}
              <button
                type="button"
                onClick={() => handleDeleteProcedure(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button type="submit">Add Hospital</button>
      </form>
      <h2>Hospitals</h2>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital._id}>
            {hospital.name} - {hospital.location}
            <button onClick={() => handleDelete(hospital._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default AdminPanel;
