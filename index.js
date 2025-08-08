const express = require("express");
const urlPostRoute = require("./routes/posturl");
const urlGetRoute = require("./routes/geturl");
const { connectToMongoDB } = require("./connect");
const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use("/url", urlPostRoute);
app.use("/url", urlGetRoute);

connectToMongoDB("mongodb://127.0.0.1:27017/urlshortener").then(() => {
    console.log("MongoDB is connected");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
