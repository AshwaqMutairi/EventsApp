let events = require("../../data");
const Event = require("../../db/models/Event");

//LIST FETCH
exports.eventListFetch = async (req, res, next) => {
  try {
    const events = await Event.find();
    return res.json(events);
  } catch (error) {
    next(error);
  }
};

//DETAIL FETCH
exports.eventDetailFetch = async (req, res, next) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);

    if (event) {
      res.json(event);
    } else {
      next({
        status: 404,
        message: "Opps! this event is not found SO cant be fitched!",
      });
    }
  } catch (error) {
    next(error);
  }
};

//CREAT
exports.eventCreate = async (req, res, next) => {
  try {
    const newEvent = await Event.create(req.body);
    return res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

//DELETE
exports.eventDelete = async (req, res, next) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);

    if (event) {
      await event.remove();
      return res.status(204).end();
    } else {
      next({ status: 404, message: "event Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

//UPDATE
exports.eventUpdate = async (req, res, next) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);

    if (event) {
      const updatedEvent = await event.updateOne(req.body, { new: true });
      return res.json(updatedEvent);
    } else {
      next({ status: 404, message: "event Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

//searchByName
exports.searchByName = async (req, res, next) => {
  const { eventName } = req.params;
  try {
    const event = await Event.findByName(eventName);

    if (event) {
      res.json(event);
    } else {
      next({
        status: 404,
        message: "Opps! there is no such name",
      });
    }
  } catch (error) {
    next(error);
  }
};

//getFullyBooked
// exports.getFullyBooked = async (req, res, next) => {
//     try {
//       const events = await Event.find();
//       return res.json(events);
//     } catch (error) {
//       next(error);
//     }
//   };
