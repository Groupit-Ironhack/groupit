const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bcryptSalt = 5;
const { dbURL } = require("../config");

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connect to DB");
  })
  .catch(e => {
    console.log(e);
  });

const salt = bcrypt.genSaltSync(bcryptSalt);
const password = "tochunga";
const encryptedPass = bcrypt.hashSync(password, salt);

const users= [
    {
  username: "josiño34",
  name: "Josiño",
  address: {
    country: "España",
    city: "Lugo"
  },
  password: encryptedPass,
  age: 34
},
{
  username: "herminia11",
  name: "Herminia",
  address: {
    country: "España",
    city: "Asturias"
  },
  password: encryptedPass,
  age: 24
},
{
  username: "ernano23",
  name: "Isaac",
  address: {
    country: "España",
    city: "Sevilla"
  },
  password: encryptedPass,
  age: 41
},
]

User.collection.drop();

User.create(users, (err, user) => {
  if (err) {
    throw err;
  }
  console.log(user);
});
