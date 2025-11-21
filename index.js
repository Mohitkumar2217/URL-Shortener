const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectToMongoDB } = require("./connect");
const optionsRouter = require("./routes/options");

const app = express();
dotenv.config();

const PORT = process.env.PORT; // default port

// middle ware
const { checkforAuthentication, restrictTo } = require("./middlewares/auth");
// routes
const staticRouter = require("./routes/static");
const urlPostRoute = require("./routes/posturl");
const urlGetRoute = require("./routes/geturl");
const userRoute = require("./routes/user");

connectToMongoDB(process.env.MONGO_URI);

app.set("view engine", "ejs");
app.set("trust proxy", 1);
app.set('views', path.resolve(__dirname, 'public', 'views'));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// auth after session
app.use(checkforAuthentication);

// serve static files (put before routes to avoid extra middleware in many cases)
app.use(express.static(path.join(__dirname, "public")));

// routes middlewares
// combine /url mounts if appropriate (keep separate only if necessary)
app.use("/url", restrictTo(['NORMAL', "ADMIN"]), urlPostRoute);
app.use("/url", restrictTo(['NORMAL', "ADMIN"]), urlGetRoute);
app.use("/user", userRoute);
app.use("/", staticRouter);
app.use("/", optionsRouter);

// avoid duplicate root route if staticRouter already handles "/"
// remove this if staticRouter already renders home
// app.get("/", (req, res) => {
//    return res.render("home");
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
