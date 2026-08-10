const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
 

const connectToMongoDB = async (url, fallbackUrl = process.env.MONGO_URI) => {
  const candidates = [url, fallbackUrl].filter(Boolean);
  let lastError = null;

  for (const uri of candidates) {
    try {
      await mongoose.connect(uri);
      console.log(`Connected to MongoDB: ${uri}`);
      return;
    } catch (err) {
      lastError = err;
      console.error(`MongoDB connection failed for: ${uri}`);
      console.error(err.message);
    }
  }

  console.error("MongoDB is unavailable. Start MongoDB locally or set a valid MONGO_URI in .env");
  console.error(lastError ? lastError.stack : "");
};

module.exports = {
  connectToMongoDB,
};