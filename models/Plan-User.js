const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planUserSchema = new Schema(
  {
    planId: {
      type: Schema.Types.ObjectId,
      ref: "Plan"
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const PlanUser = mongoose.model("PlanUser", planUserSchema);

module.exports = PlanUser;
