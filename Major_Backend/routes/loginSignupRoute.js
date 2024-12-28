var express = require("express");
var router = express.Router();
var session = require("express-session");
var cookieParser = require("cookie-parser");
const loginSignupController = require("../controller/loginSignupController");

// Session configuration
const oneDay = 1000 * 60 * 60 * 24;
router.use(
  session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
router.use(cookieParser());

router.post("/api_registration", loginSignupController.api_registration);
router.post("/api_login", loginSignupController.api_login);

module.exports = router;
