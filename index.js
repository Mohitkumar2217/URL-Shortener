const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const staticRouter = require("./routes/static");
const urlPostRoute = require("./routes/posturl");
const urlGetRoute = require("./routes/geturl");
const { connectToMongoDB } = require("./connect");
const app = express();
const PORT = process.env.PORT || 8001;

dotenv.config();

connectToMongoDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/urlshortener").then(() => {
    console.log("MongoDB is connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false}));


app.use("/url", urlPostRoute);
app.use("/url", urlGetRoute);
app.use("/", staticRouter);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
