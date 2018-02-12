const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const concertUserSchema = new Schema(
  {
    concertId: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const ConcertUser = mongoose.model("ConcertUser", concertUserSchema);

module.exports = ConcertUser;
