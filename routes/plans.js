const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const onlyMe = require("../middlewares/onlyMe");
const User = require("../models/User");
const Plan = require("../models/Plan");

router.get("/new", (req, res, next) => {
  res.render("plan/new");
});

router.post("/new", (req, res, next) => {
  const author = req.user._id;
  const name = req.body.name;
  const description = req.body.description;
  const locationId = req.body.location;
  // const date = new Date(req.body.date);

  if (locationId == "") {
    res.render("plan/new", { message: "Indique Local y localizacion" });
    return;
  }

  const newPlan = new Plan({
    author,
    name,
    description,
    locationId
    // date
  });

  newPlan
    .save()
    .then(e => {
      console.log("Plan creado en la base de datos");
      res.redirect("/");
    })
    .catch(e => {
      console.log(e);
      res.render("plan/new", { message: "Algo salió mal" });
    });
});

module.exports = router;
