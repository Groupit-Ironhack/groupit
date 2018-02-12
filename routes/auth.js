const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const name = req.body.name;
  const password = req.body.password;
  const age = req.body.age;
  const address = req.body.address;

  console.log(age)

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indique usuario y contraseña" });
    return;
  }
  else if(!( age > 18 && age<100 ) ) {
    res.render("auth/signup", { message: "La edad debe estar comprendida entre 18 y 110 años!" });
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
      address
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

authRoutes.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login"
  })
);

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;
