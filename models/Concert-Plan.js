const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Plan = require('../models/Plan')

const concertPlanSchema = new Schema(
  {
    concertId: String,
    planId: {
      type: Schema.Types.ObjectId,
      ref: "Plan"
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const ConcertPlan = mongoose.model("ConcertPlan", concertPlanSchema);

module.exports = ConcertPlan;