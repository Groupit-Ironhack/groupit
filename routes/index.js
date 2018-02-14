const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const onlyMe = require("../middlewares/onlyMe");
const PlanUser = require("../models/Plan-User");
const Plan = require("../models/Plan");

/* GET home page. */
router.get("/", (req, res, next) => {
  let user = req.user
   if(user == undefined){
    res.render("index");
  }else{
    res.redirect('/concerts')
  }
});

/* Move to plan routes!! */
router.get("/plans/:planId/join", (req,res,next) => {
  console.log("JOIN")
  let userId = req.user.id;
  let planId = req.params.planId;

  Plan.findById(planId, (err, plan) => {
    if (err) { return next(err); }
    const newPlanUser = new PlanUser({
      userId,
      planId: plan._id
    });
    newPlanUser
      .save()
      .then(e => {
        console.log("Plan asociado a concierto");
        res.redirect('back')
      })
      .catch(e => {
        console.log(e);
        res.redirect('back')
        return;
      });
  });
  
});
router.get("/plans/:planId/leave", (req,res,next) => {
  let planId = req.params.planId;
  
  PlanUser.deleteOne({'planId':planId}, (err) => {
    if (err) { return next(err); }
    res.redirect('back')
  });

});
module.exports = router;
