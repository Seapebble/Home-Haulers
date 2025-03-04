import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

interface MetaData {
  title: string;
  description: string;
  image: string;
  url: string;
}

// ✅ Load allowed meta pages from Vite environment variable
const allowedMetaPages = import.meta.env.VITE_ALLOWED_META_PAGES?.split(",") || [];

const MetaPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [meta, setMeta] = useState<MetaData | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!slug || !allowedMetaPages.includes(slug.toLowerCase())) {
    console.warn(`Invalid meta page: ${slug}, redirecting to /meta/404`);
    return <Navigate to="/meta/404" />;
  }

  useEffect(() => {
    axios
      .get(`https://reimagined-enigma-r4pj75q447qv256vw-5000.app.github.dev/meta/${slug}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("API Response:", res.data);
        setMeta(res.data);
        document.title = res.data.title;
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Error loading metadata.");
      });
  }, [slug]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!meta) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center">Meta Page</h1>
        <p className="text-center text-lg mt-2">
          This is the meta page for <strong>{slug}</strong>.
        </p>
      </div>
      <h1 className="text-3xl font-bold">{meta.title}</h1>
      <p className="text-lg">{meta.description}</p>
    </div>
  );
};

export default MetaPage;
