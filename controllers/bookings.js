const path = require("path");
const Booking = require("../models/booking");
const Error404 = require("../errors/error404");
const {
  bookingNotCreate,
  bookingIdNotFound,
  bookingDelete,
} = require("../locales/messages");
const { sendEmail } = require("../helpers/emailHelper");
const handlebars = require("handlebars");
const fs = require("fs");
const { formatDate } = require("../helpers/formatDate");
const { sendTelegramMessage } = require("../helpers/telegramHelper");

let templateString = fs.readFileSync(
  path.join(__dirname, "../template/template.hbs"),
  "utf-8",
);
let template = handlebars.compile(templateString);

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
      let html = template({
        cottageType: `${booking.cottageType || "любой"}`,
        arrivalDate: `${booking.arrivalDate || "не указано"}`,
        departureDate: `${booking.departureDate || "не указано"}`,
        adults: `${booking.adults || "не указано"}`,
        children: `${booking.children || "не указано"}`,
        name: `${booking.name || "не указано"}`,
        phone: `${booking.phone}`,
        email: `${booking.email || "не указано"}`,
        date: `${formatDate(booking.createdAt)}`,
      });

      let emailData = {
        to: "iavianm@mail.ru",
        subject: "Новое бронирование",
        html: html,
      };

      try {
        await sendEmail(emailData);
        await sendTelegramMessage(-4025896495, booking);
        res.status(201).send({ message: "Бронирование создано" });
      } catch (error) {
        res.status(500).send({
          message: "Ошибка при создании бронирования или отправке письма",
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new Error404(bookingIdNotFound);
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
