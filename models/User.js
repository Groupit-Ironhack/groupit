const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name:String,
    username: String,
    password: String,
    age: {
      type: Number,
      min:18,
      max:110
    },
    adress:{
      country:String,
      city:String
    },
    imgUrl:String
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
