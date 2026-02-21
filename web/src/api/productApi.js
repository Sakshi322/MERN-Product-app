import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// 🔐 Attach token automatically to EVERY request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// 📦 Get Products
export const fetchProducts = (page, search) =>
  API.get(`/products?page=${page}&search=${search}`);

// ❤️ Favorite Product
export const favoriteProduct = (id) =>
  API.post(`/products/${id}/favorite`);

// ❌ Unfavorite Product
export const unfavoriteProduct = (id) =>
  API.delete(`/products/${id}/favorite`);