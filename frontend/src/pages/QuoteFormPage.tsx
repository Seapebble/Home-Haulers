import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config"; // ✅ Import API URL
import styles from "../styles/QuoteForm.module.css"; // ✅ Import CSS Module

const QuoteForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    movingDate: "",
    movingSize: "",
    movingFrom: "",
    movingTo: "",
    additionalDetails: "",
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("🌍 API Base URL:", API_BASE_URL);
      console.log("📤 Sending Data:", formData);

      const res = await axios.post(`${API_BASE_URL}/request-quote`, formData, {
        withCredentials: true,
      });

      console.log("✅ Response:", res.data);
      setMessage(res.data.message);

      // ✅ Clear form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        movingDate: "",
        movingSize: "",
        movingFrom: "",
        movingTo: "",
        additionalDetails: "",
      });
    } catch (error: any) {
      console.error("❌ Form Submission Error:", error);
      setMessage(error.response?.data?.message || "Error submitting quote request.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Request a Quote</h2>
      {message && <p className="text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className={styles.inputField} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className={styles.inputField} />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required className={styles.inputField} />
        <input type="date" name="movingDate" value={formData.movingDate} onChange={handleChange} required className={styles.inputField} />
        <input type="text" name="movingSize" placeholder="Size of Move (e.g. 2-Bedroom)" value={formData.movingSize} onChange={handleChange} required className={styles.inputField} />
        <input type="text" name="movingFrom" placeholder="Moving From" value={formData.movingFrom} onChange={handleChange} required className={styles.inputField} />
        <input type="text" name="movingTo" placeholder="Moving To" value={formData.movingTo} onChange={handleChange} required className={styles.inputField} />
        <textarea name="additionalDetails" placeholder="Additional Details" value={formData.additionalDetails} onChange={handleChange} className={`${styles.inputField} ${styles.textarea}`}></textarea>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default QuoteForm;
