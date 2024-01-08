const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    cottage: {
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
    kids: {
      type: Number,
    },
    phone: {
      type: String,
      required: [true, 'Поле "phone" должно быть заполнено'],
    },
    email: {
      type: String,
    },
    additional: {
      type: [String],
      enum: [
        "Мангал",
        "Квадроцикл",
        "Эндуро",
        "Снегоход",
        "Собака",
        "Самовар",
        "Ранний заезд",
        "Поздний заезд",
        "Ранний выезд",
        "Поздний выезд",
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
