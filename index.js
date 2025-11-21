const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");

const app = express();
dotenv.config();

const PORT = process.env.PORT;
// middle ware
const { checkforAuthentication, restrictTo } = require("./middlewares/auth");
// routes
const staticRouter = require("./routes/static");
const urlPostRoute = require("./routes/posturl");
const urlGetRoute = require("./routes/geturl");
const userRoute = require("./routes/user");

connectToMongoDB("mongodb://127.0.0.1:27017/urlshortener").then(() => {
    console.log("MongoDB is connected");
});

app.set("view engine", "ejs");
app.set('views', path.resolve('./public/views'));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkforAuthentication);
app.use(express.static(path.join(__dirname, "public")));
// routes middlewares
app.use("/url", restrictTo(['NORMAL', "ADMIN"]), urlPostRoute);
app.use("/url", restrictTo(['NORMAL', "ADMIN"]), urlGetRoute);
app.use("/user", userRoute);
app.use("/", staticRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
