const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    cottageType: {
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
      type: String,
      required: [true, 'Поле "phone" должно быть заполнено'],
    },
    email: {
      type: String,
    },
    additionalOptions: {
      type: [String],
      enum: [
        "мангал",
        "квадроцикл",
        "эндуро",
        "снегоход",
        "собака",
        "самовар",
        "ранний заезд",
        "поздний заезд",
        "ранний выезд",
        "поздний выезд",
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("booking", movieSchema);
