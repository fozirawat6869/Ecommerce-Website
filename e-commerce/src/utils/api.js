import axios from "axios";

// export const BASE_URL = "http://localhost:8000";
export const BASE_URL = "https://ecommerce-website-production-79e8.up.railway.app";

const api = axios.create({
  baseURL: BASE_URL
});

export default api;


