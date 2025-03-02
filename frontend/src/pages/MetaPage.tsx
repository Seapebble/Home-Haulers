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
    console.log("Fetching metadata for:", slug); // ✅ Debug log

    axios
      .get(`https://reimagined-enigma-r4pj75q447qv256vw-5000.app.github.dev/meta/${slug}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("API Response:", res.data); // ✅ Debug log
        setMeta(res.data);
        document.title = res.data.title;

        // ✅ Function to update meta tags dynamically
        const updateMetaTag = (name: string, content: string) => {
          let element = document.querySelector(`meta[name='${name}']`) || document.createElement("meta");
          element.setAttribute("name", name);
          element.setAttribute("content", content);
          document.head.appendChild(element);
        };

        // ✅ Update meta tags
        updateMetaTag("description", res.data.description);
        updateMetaTag("keywords", "moving company, home movers, professional movers, best movers");

        // ✅ Update Open Graph (OG) meta tags
        const updateOGTag = (property: string, content: string) => {
          let element = document.querySelector(`meta[property='${property}']`) || document.createElement("meta");
          element.setAttribute("property", property);
          element.setAttribute("content", content);
          document.head.appendChild(element);
        };

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
