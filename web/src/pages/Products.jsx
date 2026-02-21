import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  fetchProducts,
  favoriteProduct,
  unfavoriteProduct,
} from "../api/productApi";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    const { data } = await fetchProducts(page, search);
    setProducts(data.products);
    setPages(data.pages);
  };

  useEffect(() => {
    loadProducts();
  }, [page, search]);

  const handleFavorite = async (id, isFav) => {
    if (isFav) await unfavoriteProduct(id);
    else await favoriteProduct(id);

    loadProducts();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        className="border border-gray-200 p-1 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      {/* PRODUCT LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-gradient-to-br from-purple-0 to-indigo-100 p-4 rounded-lg shadow-md transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <Link to={`/products/${p._id}`}>
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h2 className="text-lg font-semibold hover:text-blue-600">
                {p.title}
              </h2>
            </Link>

            <p className="text-gray-600 mt-1">High quality product...</p>
            <p className="font-bold mt-2">₹ {p.price}</p>

            {/* SMALLER FAVORITE BUTTON */}
            <button
              onClick={() => handleFavorite(p._id, p.isFavorite)}
              className={`
                mt-2 px-2 py-1 rounded text-sm w-full
                text-white font-bold transition-transform duration-300 transform
                ${p.isFavorite ? 
                  "bg-red-500 scale-105 animate-pop" : 
                  "bg-gray-400 hover:bg-red-400 hover:scale-105"
                }
              `}
            >
              {p.isFavorite ? "❤️ Favorited" : "🤍 Favorite"}
            </button>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex gap-2 mt-6 justify-center">
        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}