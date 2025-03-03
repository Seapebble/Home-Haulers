import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config"; // ✅ Import the API URL

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      console.log("🌍 API Base URL:", API_BASE_URL); // ✅ Debugging
      console.log("📤 Sending Data:", formData); // ✅ Debugging

      const res = await axios.post(`${API_BASE_URL}/request-quote`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("✅ Response:", res.data);
      setMessage(res.data.message || "Quote request submitted successfully!");

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
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again later.";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Request a Quote</h2>
      {message && <p className="text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="input-field" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="input-field" />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="input-field" />
        <input type="date" name="movingDate" value={formData.movingDate} onChange={handleChange} required className="input-field" />
        <input type="text" name="movingSize" placeholder="Size of Move (e.g. 2-Bedroom)" value={formData.movingSize} onChange={handleChange} required className="input-field" />
        <input type="text" name="movingFrom" placeholder="Moving From" value={formData.movingFrom} onChange={handleChange} required className="input-field" />
        <input type="text" name="movingTo" placeholder="Moving To" value={formData.movingTo} onChange={handleChange} required className="input-field" />
        <textarea name="additionalDetails" placeholder="Additional Details" value={formData.additionalDetails} onChange={handleChange} className="input-field"></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default QuoteForm;
