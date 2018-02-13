const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const onlyMe = require("../middlewares/onlyMe");
const User = require("../models/User");
const axios = require("axios");

router.get("/", isLoggedIn, function(req, res, next) {
  const userId = req.user._id;
  //User.findById(userId,{"adress.city":1,'_id': 0})
  User.findById(userId)
    .then(user => {
      let city = user.address.city;

      axios
        .get(
          `http://api.eventful.com/json/events/search?app_key=KLN35NSPZJRVNwD3&q=music&location=${city}&page_size=6&sort_order=popularity`
        )
        .then(function(response) {
          let events = response.data.events.event;
          res.render("concerts/index", { events });
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(e => console.log(e));
});

router.get("/:concertId", isLoggedIn, (req, res, next) => {
  const concertId = req.params.concertId;

  axios
    .get(
      `http://api.eventful.com/json/events/get?app_key=KLN35NSPZJRVNwD3&category=music&id=${concertId}`
    )
    .then(function(response) {
      let event = response.data;
      res.render("concerts/detail", { event });
    })
    .catch(function(error) {
      console.log(error);
    });
});

module.exports = router;
