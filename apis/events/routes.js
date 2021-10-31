const express = require("express");
const events = require("../../events");

const {
  eventListFetch,
  eventDetailFetch,
  eventCreate,
  eventDelete,
  eventUpdate,
  searchByName,
  getFullyBooked,
} = require("./controllers");

const router = express.Router();

//get
router.get("/", eventListFetch);
router.get("/:eventId", eventDetailFetch);

//post
router.post("/", eventCreate);

//delete
router.delete("/:eventId", eventDelete);

//update
router.put("/:evenId", eventUpdate);

//Search By Name
//Create a route that receives a query
//and filters according to the names of the events.
router.get("/:eventName", searchByName);

//fully booked events only
//Create a route that fetches a list of fully booked events only.
router.get("/:bookedSeats", getFullyBooked);

module.exports = router;
