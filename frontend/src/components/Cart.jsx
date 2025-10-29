import React, { useEffect, useState } from "react";
import API from "../api";
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(item => (
                <tr key={item._id} className="border-t">
                  <td className="p-2">{item.name}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.subtotal}</td>
                  <td>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="text-xl mt-4 font-semibold">Total: ₹{cart.total}</h3>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Checkout →
          </button>
        </>
      )}
    </div>
  );
}
