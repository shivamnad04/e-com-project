import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import ReceiptModal from "./ReceiptModal";
import { useCart } from "../context/cartContext.jsx";

export default function Checkout() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "cod",
  });

  const [receipt, setReceipt] = useState(null);
  const { cart, refreshCart } = useCart();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     

      const res = await API.post("/checkout", {
        user: form,
        cartItems: cart,
      });
      console.log("Checkout response:", res.data.receipt);

      setReceipt({
        ...res.data.receipt,
        user: { ...form },
        products: cart,
      });

      refreshCart();
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        payment: "cod",
      });
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🧾 Checkout
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Shipping Address</label>
          <textarea
            name="address"
            placeholder="123 Main Street, City, Country"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            rows={3}
            value={form.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Payment Options */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
          <div className="flex flex-col gap-2 text-gray-700">
            {["cod", "card", "upi"].map((method) => (
              <label key={method} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={form.payment === method}
                  onChange={handleChange}
                />
                {method === "cod"
                  ? "Cash on Delivery"
                  : method === "card"
                  ? "Credit / Debit Card"
                  : "UPI / Net Banking"}
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-lg font-semibold transition shadow-md"
        >
          Confirm & Place Order
        </button>
      </form>

      {receipt && (
        <ReceiptModal
          receipt={receipt}
          onClose={() => {
            setReceipt(null);
            navigate("/");
          }}
        />
      )}
    </div>
  );
}
