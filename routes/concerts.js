const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const onlyMe = require("../middlewares/onlyMe");

router.get("/", isLoggedIn, function(req, res, next) {
  res.render("concerts/index");
});

module.exports = router;
