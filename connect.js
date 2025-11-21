const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connectToMongoDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.error("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

module.exports = {
  connectToMongoDB,
}