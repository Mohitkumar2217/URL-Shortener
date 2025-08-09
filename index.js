const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const URL = require('./models/url');
const urlPostRoute = require("./routes/posturl");
const urlGetRoute = require("./routes/geturl");
const { connectToMongoDB } = require("./connect");
const app = express();
const PORT = process.env.PORT || 8001;

dotenv.config();

connectToMongoDB(process.env.MONGO_URI).then(() => {
    console.log("MongoDB is connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    res.render("home" , {
        urls: allUrls,
    });
})

app.use(express.json());
app.use("/url", urlPostRoute);
app.use("/url", urlGetRoute);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
