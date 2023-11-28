const { Segments, Joi } = require("celebrate");
const { isEmail } = require("../helpers/validCheckHelper");

const bookingBody = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().messages({
      "string.base": 'Поле "title" должно быть строкой',
      "string.empty": 'Поле "title" должно быть заполнено',
      "any.required": 'Поле "title" должно быть заполнено',
    }),
    name: Joi.string().messages({
      "string.base": 'Поле "name" должно быть строкой',
      "string.empty": 'Поле "name" должно быть заполнено',
      "any.required": 'Поле "name" должно быть заполнено',
    }),
    arrivalDate: Joi.string().messages({
      "string.base": 'Поле "arrivalDate" должно быть строкой',
      "string.empty": 'Поле "arrivalDate" должно быть заполнено',
      "any.required": 'Поле "arrivalDate" должно быть заполнено',
    }),
    departureDate: Joi.string().messages({
      "string.base": 'Поле "departureDate" должно быть строкой',
      "string.empty": 'Поле "departureDate" должно быть заполнено',
      "any.required": 'Поле "departureDate" должно быть заполнено',
    }),
    adults: Joi.number().messages({
      "number.base": 'Поле "adults" должно быть числом',
      "any.required": 'Поле "adults" должно быть заполнено',
    }),
    children: Joi.number().messages({
      "number.base": 'Поле "children" должно быть числом',
      "any.required": 'Поле "children" должно быть заполнено',
    }),
    phone: Joi.number().required().messages({
      "number.base": 'Поле "phone" должно быть числом',
      "any.required": 'Поле "phone" должно быть заполнено',
    }),
    email: Joi.string().messages({
      "string.base": 'Поле "email" должно быть строкой',
      "string.empty": 'Поле "email" должно быть заполнено',
      "any.required": 'Поле "email" должно быть заполнено',
    }),
  }),
};

const bookingId = {
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().required().hex().messages({
      "string.base": 'Поле "bookingId" должно быть строкой',
      "string.empty": 'Поле "bookingId" должно быть заполнено',
      "string.hex":
        'Поле "bookingId" должно содержать только шестнадцатеричные символы',
    }),
  }),
};

const userLogin = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().custom(isEmail).required().messages({
      "string.base": 'Поле "email" должно быть строкой',
      "string.empty": 'Поле "email" должно быть заполнено',
      "string.email": "Некорректный Email",
      "any.required": 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().required().messages({
      "string.base": 'Поле "password" должно быть строкой',
      "string.empty": 'Поле "password" должно быть заполнено',
      "any.required": 'Поле "password" должно быть заполнено',
    }),
  }),
};

const userCreate = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().custom(isEmail).required().messages({
      "string.base": 'Поле "email" должно быть строкой',
      "string.empty": 'Поле "email" должно быть заполнено',
      "string.email": "Некорректный Email",
      "any.required": 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().required().messages({
      "string.base": 'Поле "password" должно быть строкой',
      "string.empty": 'Поле "password" должно быть заполнено',
      "any.required": 'Поле "password" должно быть заполнено',
    }),
    name: Joi.string().required().min(2).max(30).messages({
      "string.base": 'Поле "name" должно быть строкой',
      "string.empty": 'Поле "name" должно быть заполнено',
      "string.min": 'Минимальная длина поля "name" - 2',
      "string.max": 'Максимальная длина поля "name" - 30',
      "any.required": 'Поле "name" должно быть заполнено',
    }),
  }),
};

const userUpdate = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(2).max(30).messages({
      "string.base": 'Поле "name" должно быть строкой',
      "string.empty": 'Поле "name" должно быть заполнено',
      "string.min": 'Минимальная длина поля "name" - 2',
      "string.max": 'Максимальная длина поля "name" - 30',
      "any.required": 'Поле "name" должно быть заполнено',
    }),
    email: Joi.string().email().custom(isEmail).required().messages({
      "string.base": 'Поле "email" должно быть строкой',
      "string.empty": 'Поле "email" должно быть заполнено',
      "string.email": "Некорректный Email",
      "any.required": 'Поле "email" должно быть заполнено',
    }),
  }),
};

module.exports = {
  bookingBody,
  bookingId,
  userLogin,
  userCreate,
  userUpdate,
};
