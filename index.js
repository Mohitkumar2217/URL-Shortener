const express = require("express");
const dotenv = require("dotenv");
const urlPostRoute = require("./routes/posturl");
const urlGetRoute = require("./routes/geturl");
const { connectToMongoDB } = require("./connect");
const app = express();
const PORT = process.env.PORT || 8001;

dotenv.config();

app.use(express.json());
app.use("/url", urlPostRoute);
app.use("/url", urlGetRoute);

connectToMongoDB(process.env.MONGO_URI).then(() => {
    console.log("MongoDB is connected");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
