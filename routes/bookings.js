const express = require("express");
const { celebrate } = require("celebrate");
const auth = require("../middlewares/auth");

const router = express.Router();
const {
  getBookings,
  createBooking,
  deleteBooking,
} = require("../controllers/bookings");
const { bookingBody, bookingId } = require("../utils/joiSchemes");

router.get("/bookings", auth, getBookings);
router.post("/bookings", auth, celebrate(bookingBody), createBooking);
router.delete(
  "/bookings/:bookingId",
  auth,
  celebrate(bookingId),
  deleteBooking,
);

module.exports = router;
