const express = require("express");
const urlRoute = require("./routes/posturl");
const { connectToMongoDB } = require("./connect");
const app = express();
const PORT = process.env.PORT || 8001;

app.use("/url", urlRoute);

connectToMongoDB("mongodb://127.0.0.1:27017/urlshortener")
.then(() => {
    console.log("MongoDB is connected");
})
.catch((err) => {
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
