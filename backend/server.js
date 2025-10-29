


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const productRouter = require("./routers/productRouter");
const cartRouter = require("./routers/cartRouter");
const checkOutRouter = require("./routers/checkOutRouter");
const connectToMongoDB = require("./config/connectMongoDB");

connectToMongoDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkOutRouter);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

