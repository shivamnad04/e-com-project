import React, { useEffect, useState } from "react";
import API from "../api.js";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext.jsx";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const { refreshCart } = useCart();

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, []);

  // handle quantity change for each product
  const handleQtyChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: parseInt(value) || 1 }));
  };

  const addToCart = async (productId) => {
    const qty = quantities[productId] || 1;
    await API.post("/cart", { productId, qty });
    refreshCart();
  
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🛍 Our Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-2xl p-5 shadow-md bg-white hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="flex-1">
              {/* Product Image Placeholder */}
              <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                📦
              </div>

              <h3 className="font-semibold text-lg mb-1 text-gray-800">
                {p.name}
              </h3>
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                {p.description}
              </p>
              <p className="font-bold text-blue-600 text-lg mb-3">
                ₹{p.price.toLocaleString()}
              </p>
            </div>

            {/* Quantity + Add button */}
            <div className="flex items-center justify-between mt-auto">
              <select
                value={quantities[p.id] || 1}
                onChange={(e) => handleQtyChange(p.id, e.target.value)}
                className="border rounded-md p-1 text-sm"
              >
                {[1, 2, 3, 4, 5].map((q) => (
                  <option key={q} value={q}>
                    Qty {q}
                  </option>
                ))}
              </select>

              <button
                onClick={() => addToCart(p.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate("/cart")}
          className="mt-10 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
        >
          🛒 View Cart →
        </button>
      </div>
    </div>
  );
}
