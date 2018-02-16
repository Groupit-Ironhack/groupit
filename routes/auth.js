const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");
const isLoggedIn = require("../middlewares/isLoggedIn");
const onlyMe = require('../middlewares/onlyMe');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const bcryptSalt = 10;
const PlanUser = require('../models/Plan-User');

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const name = req.body.name;
  const password = req.body.password;
  const age = req.body.age;
  const country = req.body.country;
  const city = req.body.city

  console.log(age)

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "You must enter username and password" });
    return;
  }
  else if(!( age > 18 && age<100 ) ) {
    res.render("auth/signup", { message: "The age must be between 18 and 110 years(for your own safety)" });
  }else if(city === ""){
    res.render("auth/signup", { message: "You must enter the city" });

    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username specify already exist" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      name,
      password: hashPass,
      age,
      "address.country": country,
      "address.city" : city
    });

    newUser.save(err => {
      if (err) {
        res.render("auth/signup", { message: "UPS!Something whent wrong!" });
      } else {
        res.redirect("/");
      }
    });
  });
});

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login");
});

authRoutes.post("/login",passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

authRoutes.get('/profile/edit', (req, res, next) => {
  const userId  = req.user._id;

  User.findById(userId, (err, user) => {
    if (err) { return next(err); }
    res.render('user/edit', { user: user });
  });
});

authRoutes.post('/profile/edit', upload.single('imgUrl'),(req, res, next) => {
  const userId  = req.user._id;
  const updates = {
    name: req.body.name,
    username: req.body.username,
    age: req.body.age,
    "address.country": req.body.address1,
    "address.city": req.body.address2,
    
  };
  if(req.file){
    updates.imgUrl = `/uploads/${req.file.filename}`;
  }
  if (req.body.password != ""){
    const password = req.body.password;
    let salt = bcrypt.genSaltSync(bcryptSalt);
    let hashPass = bcrypt.hashSync(password, salt);
    updates.password = hashPass;
  }

  User.findByIdAndUpdate(userId,updates, (err, user) => {
    if (err) { return next(err); }
    res.redirect('/profile')
  });
});

authRoutes.get('/profile', isLoggedIn, (req, res, next) => {
  const userId  = req.user._id;
  res.redirect(`/profile/${userId}`)
});

authRoutes.get('/profile/:id', isLoggedIn, (req, res, next) => {
  const userId  = req.params.id;
  const loggedId  = req.user._id;

  User.findById(userId, (err, user) => {
    if (err) { return next(err); }
    res.render('user/profile', { user: user , loggedId});
  });
});

authRoutes.get('/profile/delete/:id',onlyMe,(req, res, next) => {
  const userId  = req.user._id;

  User.deleteOne({_id:userId}, (err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


authRoutes.get("/user/myplans", isLoggedIn,(req, res, next) => {
  const userId = req.user;
  
  PlanUser.find({userId})
  .populate({path:"planId",populate: {path:'author'}})
  .then((plans)=>{
    res.render("user/myplans",{plans})
  }).catch((error) => {
    console.log(error);
  });
});

module.exports = authRoutes;
