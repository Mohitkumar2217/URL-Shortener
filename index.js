const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");


const app = express();
const PORT = process.env.PORT || 8001;
dotenv.config();
// middle ware
const {restrictToLoggedInUserOnly, checkAuth} = require("./middleware/auth");
// routes
const staticRouter = require("./routes/static");
const urlPostRoute = require("./routes/posturl");
const urlGetRoute = require("./routes/geturl");
const userRoute = require("./routes/user");
 
connectToMongoDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Shortener").then(() => {
    console.log("MongoDB is connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());


app.use("/url",restrictToLoggedInUserOnly, urlPostRoute);
app.use("/url",restrictToLoggedInUserOnly, urlGetRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRouter);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
