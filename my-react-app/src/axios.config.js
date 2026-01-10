import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", 
  headers: {
    "Content-Type": "application/json", // ensures JSON data
  },
});

export default api;