const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const { connectToMongoDB } = require("./connect");
const optionsRouter = require("./routes/options");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000; // default port

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
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// session MUST be registered before auth middleware
app.use(
  session({
    secret: process.env.SECRET || "change_this_in_production",
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
      secure: process.env.NODE_ENV === "production",
    },
  })
);

// serve static assets before auth so static files are not processed by auth middleware
app.use(express.static(path.join(__dirname, "public")));

// rate limiter (basic)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  })
);

// auth after session
app.use(checkforAuthentication);

// routes middlewares
app.use("/url", restrictTo(['NORMAL', "ADMIN"]), urlPostRoute);
app.use("/url", restrictTo(['NORMAL', "ADMIN"]), urlGetRoute);
app.use("/user", userRoute);
app.use("/", staticRouter);
app.use("/", optionsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
