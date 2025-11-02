const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connectToMongoDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

module.exports = {
    connectToMongoDB,
}