const mongoose = require("mongoose");
const Event = require("../models/event");

const getAllEvents = async (req, res, next) => {
  const events = await Event.find().exec();
  res.json(events);
};

const getEventById = async (req, res, next) => {
  const eventId = req.params.pid;

  let event;
  try {
    event = await Event.findById(eventId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  if (!event) {
    const error = new HttpError(
      "Could not find EVENT for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ event: event.toObject({ getters: true }) });
};

const createEvent = async (req, res, next) => {
  const { title, description, address } = req.body;

  const createdEvent = new Event({
    title,
    description,
    address,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdEvent.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating event failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ event: createdEvent });
};

exports.getEventById = getEventById;
exports.createEvent = createEvent;
exports.getAllEvents = getAllEvents;
