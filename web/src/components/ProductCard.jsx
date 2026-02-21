import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 shadow hover:scale-105 transition duration-300 rounded">
      <img
        src={product.image}
        className="h-40 w-full object-cover rounded"
      />

      <h3 className="font-bold mt-2">{product.title}</h3>
      <p className="text-gray-600">₹{product.price}</p>

      <Link
  to={`/products/${product._id}`}
  className="text-blue-500 text-sm"
>
  View Details
</Link>
    </div>
  );
}