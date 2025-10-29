import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);


  const loadCart = async () => {
    try {
      const res = await API.get("/cart");
      setCartCount(res.data.items.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);


  const refreshCart = async () => {
    const res = await API.get("/cart");
    setCartCount(res.data.items.length);
  };

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
