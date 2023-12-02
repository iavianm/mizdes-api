const express = require("express");
const { celebrate } = require("celebrate");
const auth = require("../middlewares/auth");

const router = express.Router();
const {
  getBookings,
  createBooking,
  deleteBooking,
  updateBooking,
  showBooking,
} = require("../controllers/bookings");
const {
  bookingBody,
  bookingId,
  bookingUpdate,
} = require("../utils/joiSchemes");

router.get("/api/bookings", auth, getBookings);

router.get("/api/bookings/:bookingId", auth, showBooking);

router.post("/api/bookings", celebrate(bookingBody), createBooking);

router.patch(
  "/api/bookings/:bookingId",
  auth,
  celebrate(bookingUpdate),
  updateBooking,
);

router.delete(
  "/api/bookings/:bookingId",
  auth,
  celebrate(bookingId),
  deleteBooking,
);

module.exports = router;
