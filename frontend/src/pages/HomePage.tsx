import React, { useEffect } from "react";
import axios from "axios";
import ComponentsQuoteForm from "../components/QuoteForm";
import Navbar from "../components/Navbar";


const HomePage: React.FC = () => {
  useEffect(() => {
    axios
      .get(`https://reimagined-enigma-r4pj75q447qv256vw-5000.app.github.dev/meta/Home`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("✅ About Page Meta Data:", res.data);
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-4xl font-bold text-center mb-6">Welcome to OC Pro Movers</h1>
        <ComponentsQuoteForm />
      </div>
    </div>
  );
};

export default HomePage;
