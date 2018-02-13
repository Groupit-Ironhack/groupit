const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Plan = require ('../models/Plan');

const userSchema = new Schema(
  {
    name:String,
    username: String,
    password: String,
    age: {
      type: Number,
      minAge:18,
      maxAge:110
    },
    address:{
      country:String,
      city:String
    },
    imgUrl:{ 
      type: String, 
      default: "img/user-placeholder.png" }  
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
