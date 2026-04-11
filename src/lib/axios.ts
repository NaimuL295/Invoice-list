import axios from "axios";
axios.defaults.withCredentials = true; 
const api = axios.create({
  baseURL: "https://invoice-server-vvx0.onrender.com",
});

api.defaults.withCredentials = true;

export default api;