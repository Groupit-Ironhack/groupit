const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('../models/User')

const planSchema =new Schema(
    {
      author: [
        { 
          type : Schema.Types.ObjectId, 
          ref: 'User' 
        }
      ],
      description: String,
      location: {
        name : String,
        address: {
          number: Number,
          street: String,
          city: String,
          state: String,
          country: String,
          zip: Number
        },
        coordinates: {
          lat: Number,
          lng: Number
        }
      },
      attendants: [
        { 
          type : Schema.Types.ObjectId, 
          ref: 'User' 
        }
      ],
      date: Date,
    },
    {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
  );

  const Plan = mongoose.model("Plan", planSchema);

  module.exports = Plan;