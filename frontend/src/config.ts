const API_BASE_URL = 
  import.meta.env.VITE_NODE_ENV == "production"
    ? `${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_BACKEND_API_SLUG}`
    : import.meta.env.VITE_BACKEND_API_SLUG; 

export default API_BASE_URL;


console.log("🌍 API Base URL:", API_BASE_URL);