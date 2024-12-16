require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override"); // let you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

const connectDB = require("./server/config/db");
const session = require("express-session");
const { isActiveRoute } = require("./server/helpers/routeHelpers");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(express.static("public")); //so we don't have to go back ward at main.ejs when we link css just /css/style.css

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.locals.isActiveRoute = isActiveRoute;

app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
