const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    arrivalDate: {
      type: String,
    },
    departureDate: {
      type: String,
    },
    adults: {
      type: Number,
    },
    children: {
      type: Number,
    },
    phone: {
      type: Number,
      required: [true, 'Поле "phone" должно быть заполнено'],
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("booking", movieSchema);
