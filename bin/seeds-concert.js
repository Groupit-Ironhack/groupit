/*jshint esversion: 6 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Concert = require("../models/Concert");
const Artist = require("../models/Artist");
const { dbURL } = require("../config");

mongoose.connect(dbURL);

const concerts = [
  {
    concertId: "87292345ygaf9iu2367",
    locationId: "ChIJ_SuoWaUoQg0R4wWpEFDnT4I",
    date: new Date("Jun 23 2018 19:00"),
    attendants: [ 
      "5a818be7a4027b15a2d70722"
    ],
  },
  {
    concertId: "8729hjefh20jsf392367",
    locationId: "ChIJ_SuoWaUoQg0R4wWpEFDnT4I",
    date: new Date("Jun 23 2018 19:00"),
    attendants: [ 
      "5a818be7a4027b15a2d70722"
    ],
  },
  {
    concertId: "87ahf345ygaf9iu23298",
    locationID: "ChIJ6Xkh0HKipBIR6nPfOWXjPnc",
    date: new Date("Jun 23 2018 19:00"),
    attendants: [ 
      "5a818be7a4027b15a2d70722","5a818be7a4027b15a2d70720"
    ],
  }
];
Concert.collection.drop();

Concert.create(concerts, (err, docs) => {
  console.log("reading concerts")
  if (err) {
    throw err;
  }
  docs.forEach(concert => {
    console.log(concert.date);
  });
  // mongoose.connection.close();
});
