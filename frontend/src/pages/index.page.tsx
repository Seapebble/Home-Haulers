import React from "react";

const Page: React.FC = () => {
  return (
    <div>
      <h1>🏠 Welcome to Home Haulers</h1>
      <p>This is a fully server-side rendered page using Vike.</p>
    </div>
  );
};

// ✅ Correctly export `{ Page }`
export { Page };

// ✅ Add `title` for dynamic page titles
export const title = "Home - Home Haulers";
