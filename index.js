// index.js
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8001;

// middlewares
const { checkforAuthentication, restrictTo } = require("./middlewares/auth");

// routes
const staticRouter = require("./routes/static");
const urlPostRoute = require("./routes/posturl");
const urlGetRoute = require("./routes/geturl");
const userRoute = require("./routes/user");
const optionsRouter = require("./routes/options");

// connect to DB (connect.js already logs & exits on failure)
connectToMongoDB(process.env.MONGO_URI);

// view engine
app.set("view engine", "ejs");
app.set("trust proxy", 1);
app.set("views", path.resolve("./public/views"));

// middlewares (order matters)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// session must be before auth middleware that uses req.session
app.use(
  session({
    secret: process.env.SECRET || "mysecretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production", // only over HTTPS in prod
    },
  })
);

// auth middleware (reads JWT token from cookie)
app.use(checkforAuthentication);

// static files
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlPostRoute); // POST /url
app.use("/url", urlGetRoute); // GET /url/:shortId and /url/analytic/:shortId
app.use("/user", userRoute);
app.use("/", staticRouter);
app.use("/", optionsRouter);

// home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

// error handling
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).render("error", { error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
