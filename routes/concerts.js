const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const onlyMe = require("../middlewares/onlyMe");
const User = require("../models/User");
const Plan = require("../models/Plan");
const ConcertPlan = require("../models/Concert-Plan");
const PlanUser = require("../models/Plan-User");
const axios = require("axios");

router.get("/", isLoggedIn, function(req, res, next) {
  const userId = req.user._id;
  User.findById(userId)
    .then(user => {
      let city = user.address.city;
      axios
        .get(
          `http://api.eventful.com/json/events/search?app_key=KLN35NSPZJRVNwD3&q=music&location=${city}&page_size=6&sort_order=popularity`
        )
        .then(function(response) {
          if(!response.data.events){
            res.render("concerts/index", { message: "There are no concerts in your area yet :(" })
          } else {
            let events = response.data.events.event;
            res.render("concerts/index", { events });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(e => console.log(e));
});

router.get("/:concertId", isLoggedIn, (req, res, next) => {
  const concertId = req.params.concertId;
  let plans = [];
  let event;

  axios
    .get(
      `http://api.eventful.com/json/events/get?app_key=KLN35NSPZJRVNwD3&category=music&id=${concertId}`
    )
    .then(function(response) {
      event = response.data;
      ConcertPlan.find({concertId: concertId}).populate({path:"planId",populate: {path:'author'}})
      .then(plans => {
        let userId = req.user.id;
        let going = []
        PlanUser.find({"userId": req.user.id}, {"planId":1, "_id": 0}).then((assisting)=>{
          let values = assisting.map(a =>{
            return a.planId;
          })
          plans.forEach(p =>{
            let go = false
            values.forEach(v =>{
              if (v.equals(p.planId._id)){
                go = true;
              }
            })
            going.push(go)
          })
           console.log(event.images.image)
            res.render("concerts/detail", { event, plans, going });
        })
      }).catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
