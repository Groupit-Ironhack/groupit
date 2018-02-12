const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('../models/User');

const planSchema =new Schema(
    {
      author: [
        { 
          type : Schema.Types.ObjectId, 
          ref: 'User' 
        }
      ],
      concertId:String, 
      description: String,
      locationId: String,
      date: Date,
    },
    {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
  );

  const Plan = mongoose.model("Plan", planSchema);

  module.exports = Plan;