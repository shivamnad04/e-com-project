const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: Number,
  qty: Number,
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;
