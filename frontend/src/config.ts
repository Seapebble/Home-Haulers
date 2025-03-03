
const API_BASE_URL = 
  import.meta.env.VITE_NODE_ENV == "production"
    ? `${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_BACKEND_API_URL}`/// ✅ Production Backend URL
    : "/api"; // ✅ Use Vite Proxy in Dev Mode

export default API_BASE_URL;


console.log("🌍 API Base URL:", API_BASE_URL);