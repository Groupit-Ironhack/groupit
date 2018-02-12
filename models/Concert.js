const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const concertSchema = new Schema(
  {
    artist: String,
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
    ]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Concert = mongoose.model("Concert", concertSchema);

module.exports = Concert;
