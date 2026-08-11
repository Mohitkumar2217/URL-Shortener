const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
// middle ware
const { checkforAuthentication, restrictTo } = require("./middlewares/auth");
// routes
const staticRouter = require("./routes/static");
const urlPostRoute = require("./routes/posturl");
const urlGetRoute = require("./routes/geturl");
const userRoute = require("./routes/user.js");

const app = express();
const PORT = process.env.PORT || 8001;
connectToMongoDB(process.env.MONGO_URI);

app.set("view engine", "ejs");
app.set('views', path.resolve('./public/views'));

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkforAuthentication);
app.use((req, res, next) => {
    res.locals.baseUrl = `${req.protocol}://${req.get("host")}`;
    res.locals.user = req.user;
    next();
});
app.use(express.static(path.join(__dirname, "public")));
// routes middlewares
app.use("/url", restrictTo(['NORMAL', "ADMIN"]), urlPostRoute);
app.use("/url", restrictTo(['NORMAL', "ADMIN"]), urlGetRoute);
app.use("/", userRoute);
app.use("/", staticRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
