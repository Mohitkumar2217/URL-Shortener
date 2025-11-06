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

const PORT = process.env.PORT;
// middle ware
const { checkforAuthentication, restrictTo } = require("./middlewares/auth");
// routes
const staticRouter = require("./routes/static");
const urlPostRoute = require("./routes/posturl");
const urlGetRoute = require("./routes/geturl");
const userRoute = require("./routes/user");

connectToMongoDB(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ MongoDB connection error:", err));


app.set("view engine", "ejs");
app.set("trust proxy", 1);
app.set('views', path.resolve('./public/views'));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkforAuthentication);
app.use(express.static(path.join(__dirname, "public")));
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
      httpOnly: true,        // prevents client-side JS access
      maxAge: 1000 * 60 * 60 * 24,  // 1 day
      sameSite: "none",      // important for cross-site requests
      secure: true           // must be true on Render (HTTPS)
    },
  })
);

// routes middlewares
app.use("/url", restrictTo(['NORMAL', "ADMIN"]), urlPostRoute);
app.use("/url", restrictTo(['NORMAL', "ADMIN"]), urlGetRoute);
app.use("/user", userRoute);
app.use("/", staticRouter);
app.use("/", optionsRouter);
app.get("/", (req, res) => {
   return res.render("home");
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
