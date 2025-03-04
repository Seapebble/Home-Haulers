import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const metaLink = location.pathname.startsWith("/meta/") ? location.pathname : "/meta/home"; // ✅ Simpler logic

  return (
    <nav className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-bold">OC Pro Movers</div>
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/signin" className="hover:underline">Signin</Link>
        <Link to={metaLink} className="hover:underline">Meta Test</Link>
      </div>
    </nav>
  );
};

export default Navbar;
