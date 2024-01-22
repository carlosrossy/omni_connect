import axios from "axios";

const api = axios.create({
  baseURL: "https://omni-connect-service.onrender.com/development",
});
export default api;
