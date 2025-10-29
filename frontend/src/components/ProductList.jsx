import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/products")
      .then(res => setProducts(res.data))
      .catch(console.error);
  }, []);

  const addToCart = async (productId) => {
    await API.post("/cart", { productId, qty: 1 });
    alert("Added to cart!");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-gray-500 text-sm">{p.description}</p>
            <p className="font-bold mt-2">₹{p.price}</p>
            <button
              onClick={() => addToCart(p.id)}
              className="mt-3 bg-blue-600 text-white px-4 py-1 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/cart")}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        Go to Cart →
      </button>
    </div>
  );
}
