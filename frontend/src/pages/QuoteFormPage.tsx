import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config"; // ✅ Import API URL

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
      const res = await axios.post(`${API_BASE_URL}/request-quote`, formData, {
        withCredentials: true,
      });
      setMessage(res.data.message);
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
    } catch (error) {
      setMessage("Error submitting quote request.");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Request a Quote</h2>
      {message && <p className="text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="input-field" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="input-field" />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="input-field" />
        <input type="date" name="movingDate" value={formData.movingDate} onChange={handleChange} required className="input-field" />
        <input type="text" name="movingSize" placeholder="Size of Move (e.g. 2-Bedroom)" value={formData.movingSize} onChange={handleChange} required className="input-field" />
        <input type="text" name="movingFrom" placeholder="Moving From" value={formData.movingFrom} onChange={handleChange} required className="input-field" />
        <input type="text" name="movingTo" placeholder="Moving To" value={formData.movingTo} onChange={handleChange} required className="input-field" />
        <textarea name="additionalDetails" placeholder="Additional Details" value={formData.additionalDetails} onChange={handleChange} className="input-field"></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
      </form>
    </div>
  );
};

export default QuoteForm;
