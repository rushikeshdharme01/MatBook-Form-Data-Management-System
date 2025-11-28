// src/api/client.js
import axios from "axios";

// For now, hardcode backend URL (local)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
