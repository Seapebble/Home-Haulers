import React from "react";
import Navbar from "../components/Navbar";

const AboutPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <h1>About OC Pro Movers</h1>
      <p>We are the best moving company in the area!</p>
    </div>
  );
};

export default AboutPage;
export const renderServerSide = false;
export const prerender = false;