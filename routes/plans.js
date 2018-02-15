const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const onlyMe = require("../middlewares/onlyMe");
const User = require("../models/User");
const Plan = require("../models/Plan");
const ConcertPlan = require("../models/Concert-Plan");
const PlanUser = require("../models/Plan-User");

router.get("/:concertId/new", (req, res, next) => {
  const concertId = req.params.concertId;
  res.render("plan/new", { concertId });
});

router.post("/:concertId/new", (req, res, next) => {
  const author = req.user._id;
  const concertId = req.params.concertId;
  const date = req.body.time
  const description = req.body.description;
  const locationId = req.body.location;
  // const date = new Date(req.body.date);

  if (locationId == "") {
    res.render("plan/new", { message: "Indique Local y localizacion" });
    return;
  }

  const newPlan = new Plan({
    author,
    description,
    date,
    locationId
    // date
  });

  newPlan.save()
    .then(plan => {
      console.log("Plan creado en la base de datos");
      const newPlanConcert = new ConcertPlan({
        concertId,
        planId: plan._id
      });
      const newPlanUser = new PlanUser({
        planId: plan._id,
        userId: author
      })
      newPlanUser.save();
      newPlanConcert.save()
        .then(e => {
          console.log("Plan asociado a concierto");
          res.redirect(`/concerts/${concertId}`);
        })
        .catch(e => {
          console.log(e);

          res.render("plan/new", { message: "Algo salió mal" });
          return;
      });
    })
    .catch(e => {
      console.log(e);
      res.render("plan/new", { message: "Algo salió mal" });
    });
});

router.get('/:planId/detail', (req, res, next) => {
  const planId  = req.params.planId;
  const user = req.user;

  Plan.findById(planId, (err, plan) => {
    if (err) { return next(err); }
    res.render("plan/detail", { plan,user })
  });
})


router.get('/:planId/edit', (req, res, next) => {
  const planId  = req.params.planId;
  const user = req.user;

  Plan.findById(planId, (err, plan) => {
    if (err) { return next(err); }
    res.render("plan/edit", { plan,user })
  });
})

router.post('/:planId/edit', (req, res, next) => {
  const planId  = req.params.planId;
  const user = req.user;

  const updatePlan = {
    date : req.body.time,
    description : req.body.description,
    locationId : req.body.location,
  };

  Plan.findByIdAndUpdate(planId,updatePlan, (err, plan) => {
    if (err) { return next(err); }
    res.redirect(`/plans/${planId}/detail`)
  });
})

router.get('/:planId/delete',(req, res, next) => {
  const planId  = req.params.planId;

  ConcertPlan.deleteOne({'planId':planId}, (err) => {
    if (err) { return next(err); }
  });

  PlanUser.deleteOne({'planId':planId}, (err) => {
    if (err) { return next(err); }
  });

  Plan.deleteOne({_id:planId}, (err) => {
    if (err) { return next(err); }
    res.redirect('/concerts');
  });
});

module.exports = router;
