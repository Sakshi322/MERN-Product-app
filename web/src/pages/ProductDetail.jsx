import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ import useNavigate
import api from "../api/axios";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ initialize navigate
  const [product, setProduct] = useState(null);
  const [fav, setFav] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
      setFav(res.data.isFavorite);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (fav) {
        await api.delete(`/products/${id}/favorite`);
      } else {
        await api.post(`/products/${id}/favorite`);
      }
      setFav(!fav);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!product) return <p className="p-6 text-center">Product not found</p>;

  return (
    <div className="p-4 sm:p-6 max-w-md sm:max-w-4xl mx-auto">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
      >
        ← Back to Products
      </button>

      <div className="bg-white p-4 sm:p-6 shadow rounded transition-all duration-300 hover:shadow-xl">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 sm:h-72 object-cover rounded transition-transform duration-500 hover:scale-105"
        />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2">
          <h1 className="text-xl sm:text-2xl font-bold">{product.title}</h1>

          <button
            onClick={toggleFavorite}
            className={`text-2xl sm:text-3xl transition-transform duration-300 ${
              fav
                ? "text-red-500 scale-110"
                : "text-gray-300 hover:scale-110"
            }`}
          >
            ♥
          </button>
        </div>

        <p className="text-gray-600 mt-2 text-lg sm:text-xl">₹{product.price}</p>
        <p className="mt-3 leading-relaxed text-sm sm:text-base">{product.description}</p>
      </div>
    </div>
  );
}