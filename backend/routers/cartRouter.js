const express = require("express");
const { addToCart, removeFromCart, getCart } = require("../controllers/cartController");
const router = express.Router();

router.post("/", addToCart);
router.get("/", getCart);
router.delete("/:id", removeFromCart);

module.exports = router;
