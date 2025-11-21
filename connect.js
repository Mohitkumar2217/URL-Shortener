const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectToMongoDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // wait up to 30 seconds for MongoDB server
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // exit process if DB connection fails
  }
};

// Optional: log when connection is lost or reconnected
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected');
});
mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected');
});

module.exports = {
  connectToMongoDB,
};
