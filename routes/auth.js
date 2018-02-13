const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");
const onlyMe = require('../middlewares/onlyMe')
const bcryptSalt = 10;

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
    res.render("auth/signup", { message: "Indique usuario y contraseña" });
    return;
  }
  else if(!( age > 18 && age<100 ) ) {
    res.render("auth/signup", { message: "La edad debe estar comprendida entre 18 y 110 años!" });
    return;
  }else if(city === ""){
    res.render("auth/signup", { message: "Indique una ciudad" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "El usuario especificado ya existe" });
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
        res.render("auth/signup", { message: "Algo salió mal" });
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

authRoutes.post('/profile/edit', (req, res, next) => {
  const userId  = req.user._id;
  
  const updates = {
    name: req.body.name,
    username: req.body.username,
    age: req.body.age,
    "address.country": req.body.address1,
    "address.city": req.body.address2
  };
  
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

authRoutes.get('/profile', (req, res, next) => {
  const userId  = req.user._id;
  res.redirect(`/profile/${userId}`)
});

authRoutes.get('/profile/:id', (req, res, next) => {
  const userId  = req.params.id;

  User.findById(userId, (err, user) => {
    if (err) { return next(err); }
    res.render('user/profile', { user: user });
  });
});

authRoutes.get('/profile/delete/:id',(req, res, next) => {
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

module.exports = authRoutes;
