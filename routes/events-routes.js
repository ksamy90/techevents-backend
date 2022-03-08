const express = require("express");
const { check } = require("express-validator");
const eventsControllers = require("../controllers/events-controllers");

const router = express.Router();

router.get("/", eventsControllers.getAllEvents);

router.get("/:pid", eventsControllers.getEventById);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  eventsControllers.createEvent
);

module.exports = router;
