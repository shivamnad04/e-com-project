const CartItem = require("../models/cartItem");
const Product = require("../models/product");

// POST /api/checkout
const checkout = async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    if (cartItems.length === 0) return res.status(400).json({ error: "Cart empty" });

    const products = await Product.find();

    const total = cartItems.reduce((sum, item) => {
      const prod = products.find(p => p.id === item.productId);
      return sum + (prod?.price || 0) * item.qty;
    }, 0);

    const receipt = {
      total,
      timestamp: new Date().toISOString(),
      cart: cartItems.map(item => {
        const prod = products.find(p => p.id === item.productId);
        return {
          name: prod?.name || "Unknown",
          price: prod?.price || 0,
          qty: item.qty,
        };
      }),
    };

    // Clear cart
    await CartItem.deleteMany({});

    res.json({ message: "Checkout successful", receipt });
  } catch {
    res.status(500).json({ error: "Checkout failed" });
  }
};

module.exports = { checkout };
