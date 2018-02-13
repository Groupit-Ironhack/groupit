const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const onlyMe = require("../middlewares/onlyMe");

/* GET home page. */
router.get("/", function(req, res, next) {
  let user = req.user
   if(user == undefined){
    res.render("index");
  }else{
    res.redirect('/concerts')
  }
});

module.exports = router;
