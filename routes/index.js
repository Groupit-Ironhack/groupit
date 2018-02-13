const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const onlyMe = require("../middlewares/onlyMe");

/* GET home page. */
router.get("/",isLoggedIn, function(req, res, next) {
  let userId = req.user._id
  res.render("index",{userId});
});

module.exports = router;
