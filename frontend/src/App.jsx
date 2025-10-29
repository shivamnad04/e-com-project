import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./components/Checkout";
import { useCart } from "./context/cartContext.jsx";

export default function App() {
  const { cartCount } = useCart();
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <Link to="/" className="font-bold text-lg">
          🛍 E-Commerce
        </Link>
        <div>
          <Link to="/" className="px-3">
            Products
          </Link>
          <Link to="/cart" className="px-3 relative">
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white rounded-full px-2">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}
