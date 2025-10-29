const Product = require("../models/product");

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // If DB empty → insert mock data
    if (products.length === 0) {
      const mockProducts = [
        { id: 1, name: "Vibe T-Shirt", price: 499, description: "Soft cotton T-shirt" },
        { id: 2, name: "Wireless Earbuds", price: 1599, description: "Bluetooth earbuds" },
        { id: 3, name: "Smart Watch", price: 2999, description: "Fitness smartwatch" },
        { id: 4, name: "Running Shoes", price: 2499, description: "Lightweight shoes" },
        { id: 5, name: "Laptop Sleeve", price: 899, description: "Protective sleeve" }
      ];
      await Product.insertMany(mockProducts);
      return res.json(mockProducts);
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

module.exports = { getProducts };
