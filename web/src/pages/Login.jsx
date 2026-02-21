import { useState, useContext, useEffect } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔒 If already logged in, don't allow login page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", form);

      // save token in context + localStorage
      login(res.data.token);

      // go to protected page
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto mt-16 bg-white p-6 shadow-lg rounded"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

      {error && (
        <p className="bg-red-100 text-red-600 p-2 mb-3 rounded">{error}</p>
      )}

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Email"
        type="email"
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="w-full border p-2 rounded"
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        disabled={loading}
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}