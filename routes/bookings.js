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

router.get("/api/bookings", auth, getBookings);
router.post("/api/bookings", celebrate(bookingBody), createBooking);
router.delete(
  "/api/bookings/:bookingId",
  auth,
  celebrate(bookingId),
  deleteBooking,
);

module.exports = router;
