import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6 text-center">
        <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
        <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">Go Home</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
