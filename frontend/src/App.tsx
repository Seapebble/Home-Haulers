import React from "react";
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MetaPage from "./pages/MetaPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/404Page";
import SignIn from "./pages/SignInPage";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/meta/:slug",
    element: <MetaPage />,
    loader: async ({ params }) => {
      const slug = params.slug?.toLowerCase() || "";
      console.log("Attempting to load meta page:", slug);

      return { slug }; // ✅ Only pass `slug` (no longer passing `allowedMetaPages`)
    },
  },
  { path: "/meta/404", element: <NotFoundPage /> }, // ✅ Meta-specific 404 page
  { path: "/about", element: <AboutPage /> },
  { path: "/signin", element: <SignIn /> },
  { path: "*", element: <NotFoundPage /> }, // ✅ Global 404 page for non-meta routes
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
