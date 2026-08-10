const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectToMongoDB = async (
    url,
    fallbackUrl = process.env.MONGO_URI
) => {
    const candidates = [url, fallbackUrl].filter(Boolean);

    if (candidates.length === 0) {
        throw new Error(
            "MongoDB URI is missing. Set MONGO_URI in your .env file."
        );
    }

    let lastError = null;

    for (const uri of candidates) {
        try {
            await mongoose.connect(uri);

            console.log("✅ Connected to MongoDB");
            return;
        } catch (err) {
            lastError = err;

            console.error("❌ MongoDB connection failed");
            console.error(err.message);

            // Make sure a failed connection doesn't affect
            // the next connection attempt.
            await mongoose.disconnect();
        }
    }

    throw lastError;
};

module.exports = {
    connectToMongoDB,
};