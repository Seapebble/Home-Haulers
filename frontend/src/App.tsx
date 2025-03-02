import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MetaPage from "./pages/MetaPage";
import AboutPage from "./pages/AboutPage";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/meta/:slug", element: <MetaPage /> },
  { path: "/about", element: <AboutPage /> },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
