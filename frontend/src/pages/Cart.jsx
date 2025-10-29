import React, { useEffect, useState } from "react";
import API from "../api.js";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext.jsx";

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const navigate = useNavigate();
  const { refreshCart } = useCart();

  const fetchCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data);
  };

  const removeItem = async (id) => {
    await API.delete(`/cart/${id}`);
    fetchCart();
    refreshCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        🛒 Your Shopping Cart
      </h2>

      {cart.items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
          >
            Browse Products →
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
            <table className="w-full text-left text-sm md:text-base">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Subtotal</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium text-gray-800">
                      {item.name}
                    </td>
                    <td className="p-3 text-gray-600">{item.qty}</td>
                    <td className="p-3 text-gray-700 font-semibold">
                      ₹{item.price.toLocaleString()}
                    </td>
                    <td className="p-3 text-gray-800 font-semibold">
                      ₹{item.subtotal.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total + Checkout */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 bg-gray-50 p-5 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Total: <span className="text-blue-600">₹{cart.total.toLocaleString()}</span>
            </h3>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-5 py-2 rounded-lg transition"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
