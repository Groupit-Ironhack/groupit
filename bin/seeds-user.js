const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bcryptSalt = 20;
const { dbURL } = require("./config");

mongoose.connect(dbURL).then(() => console.log("Connect to DB"));

const salt = bcrypt.genSaltSync(bcryptSalt);
const password = "contraseñatochunga";
const encryptedPass = bcrypt.hashSync(password, salt);

const josito = new User({
  username: "josiño33",
  name: "Josiño",
  adress: {
    country: "España",
    city: "Lugo"
  },
  password: encryptedPass,
  age: 34
});

User.create(josito, (err, user) => {
  if (err) {
    throw err;
  }
  console.log(user);
});
