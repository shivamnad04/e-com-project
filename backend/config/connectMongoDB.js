const mongoose = require("mongoose");
const process = require("process");
const MONGO_URI ="mongodb+srv://root:root@cluster0.5lam1mo.mongodb.net/test4?retryWrites=true&w=majority&appName=Cluster0";
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected!!");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }
};

module.exports = connectToMongoDB;
