const CartItem = require("../models/cartItem");
const Product = require("../models/product");

// POST /api/cart
const addToCart = async (req, res) => {
  const { productId, qty } = req.body;

  try {
    const product = await Product.findOne({ id: productId });
    if (!product) return res.status(404).json({ error: "Product not found" });

    let existing = await CartItem.findOne({ productId });
    if (existing) {
      existing.qty += qty;
      await existing.save();
    } else {
      existing = new CartItem({ productId, qty });
      await existing.save();
    }

    res.status(201).json({ message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

// DELETE /api/cart/:id
const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;

    await CartItem.findOneAndDelete({  productId });
    res.json({ message: "Item removed" });
  } catch {
    res.status(500).json({ error: "Failed to remove item" });
  }
};

// GET /api/cart
const getCart = async (req, res) => {
  try {
    const items = await CartItem.find();
    const products = await Product.find();

    const detailed = items.map(i => {
      const prod = products.find(p => p.id === i.productId);
      return {
        _id: i._id,
        productId: i.productId,
        name: prod?.name,
        price: prod?.price,
        qty: i.qty,
        subtotal: (prod?.price || 0) * i.qty
      };
    });

    const total = detailed.reduce((sum, i) => sum + i.subtotal, 0);
    res.json({ items: detailed, total });
  } catch {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

module.exports = { addToCart, removeFromCart, getCart };
