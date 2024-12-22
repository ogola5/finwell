import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./KycForm.css";

const KycForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    id: "",
    profession: "",
    contact: "",
    country: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(""); 
    setSuccessMessage(""); 

    try {
      const response = await axios.post(
        `http://localhost:5000/api/kyc/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        }
      );

      // On success, update success message and navigate to login
      setSuccessMessage(response.data.message);
      navigate("/login"); // Redirect to login after successful KYC submission
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to submit KYC data."
      );
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="kyc-form-container">
      <h2>Know Your Customer (KYC) Form</h2>
      <form onSubmit={handleSubmit} className="kyc-form">
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="profession">Profession</label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default KycForm;
