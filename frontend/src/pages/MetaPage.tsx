import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface MetaData {
  title: string;
  description: string;
  image: string;
  url: string;
}

const MetaPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/meta/${slug}`, { withCredentials: true }) // ✅ Allow cross-origin cookies if needed
      .then((res) => {
        setMeta(res.data);
        document.title = res.data.title; // ✅ Set page title dynamically

        // ✅ Function to update meta tags
        const updateMetaTag = (name: string, content: string) => {
          let element = document.querySelector(`meta[name='${name}']`) || document.createElement("meta");
          element.setAttribute("name", name);
          element.setAttribute("content", content);
          document.head.appendChild(element);
        };

        // ✅ Function to update Open Graph meta tags
        const updateOGTag = (property: string, content: string) => {
          let element = document.querySelector(`meta[property='${property}']`) || document.createElement("meta");
          element.setAttribute("property", property);
          element.setAttribute("content", content);
          document.head.appendChild(element);
        };

        // ✅ Update meta tags
        updateMetaTag("description", res.data.description);
        updateMetaTag("keywords", "moving company, home movers, professional movers, best movers");

        // ✅ Update Open Graph (OG) meta tags
        updateOGTag("og:title", res.data.title);
        updateOGTag("og:description", res.data.description);
        updateOGTag("og:image", res.data.image);
        updateOGTag("og:url", res.data.url);
        updateOGTag("og:type", "website");

        // ✅ Update Twitter Card meta tags
        updateMetaTag("twitter:title", res.data.title);
        updateMetaTag("twitter:description", res.data.description);
        updateMetaTag("twitter:image", res.data.image);
        updateMetaTag("twitter:card", "summary_large_image");
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
      <h1 className="text-3xl font-bold">{meta.title}</h1>
      <p className="text-lg">{meta.description}</p>
    </div>
  );
};

export default MetaPage;
