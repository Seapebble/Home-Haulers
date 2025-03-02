
const API_BASE_URL =
  import.meta.env.VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_API_BASE_URL // ✅ Make sure this is your backend URL
    : "http://localhost:5000/api";

export default API_BASE_URL;

console.log("🌍 API Base URL:", API_BASE_URL);