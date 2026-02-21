import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { HomeIcon } from "@heroicons/react/24/solid"; 

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-gradient-to-r from-purple-100 to-indigo-200 text-white">
      
      {/* Home Icon */}
      <Link to="/" className="flex items-center gap-2 text-gray-700 hover:opacity-90 text-purple-600">
        <HomeIcon className="w-6 h-6 ml-5" /><p className="text-gray-700">MarketPlace</p>
      </Link>

      {/* Auth Links */}
      <div className="flex items-center gap-4">
        {token ? (
          <button
            onClick={logout}
            className="bg-white text-purple-600 px-4 py-1 rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-purple-600 px-4 py-1 rounded hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-purple-600 px-4 py-1 rounded hover:bg-gray-200 transition"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}