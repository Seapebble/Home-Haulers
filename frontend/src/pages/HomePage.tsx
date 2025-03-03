import React from "react";
import QuoteForm from "../components/QuoteForm";
import QuoteFormPage from "./QuoteFormPage";

const HomePage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to OC Pro Movers</h1>
      <QuoteFormPage/>
    </div>
  );
};

export default HomePage;
