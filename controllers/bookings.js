const Booking = require("../models/booking");
const Error404 = require("../errors/error404");
const Error403 = require("../errors/error403");
const {
  bookingNotCreate,
  bookingIdNotFound,
  bookingNotDelete,
  bookingDelete,
} = require("../locales/messages");

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (err) {
    next(err);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const {
      cottageType,
      name,
      arrivalDate,
      departureDate,
      adults,
      children,
      phone,
      email,
    } = req.body;

    const booking = await Booking.create({
      cottageType,
      name,
      arrivalDate,
      departureDate,
      adults,
      children,
      phone,
      email,
    });
    if (!booking) {
      throw new Error404(bookingNotCreate);
    } else {
      res.status(201).send(booking);
    }
  } catch (err) {
    next(err);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user._id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new Error404(bookingIdNotFound);
    }

    if (booking.owner.toString() !== userId) {
      throw new Error403(bookingNotDelete);
    }

    await booking.deleteOne();

    res.send({ message: bookingDelete });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBookings,
  createBooking,
  deleteBooking,
};
