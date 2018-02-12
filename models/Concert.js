const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const concertSchema = new Schema(
  {
    concertId: String,
    locationId: String,
    date: Date
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Concert = mongoose.model("Concert", concertSchema);

module.exports = Concert;
