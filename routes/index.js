const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const onlyMe = require("../middlewares/onlyMe");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});

router.get("/private", isLoggedIn, function(req, res, next) {
  res.render("user/profile");
});

router.get("/onlyme", onlyMe, function(req, res, next) {
  res.render("index");
});

module.exports = router;
