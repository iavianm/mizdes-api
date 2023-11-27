const express = require("express");
const auth = require("../middlewares/auth");

const router = express.Router();
const userRouter = require("./users");
const movieRouter = require("./movies");
const Error404 = require("../errors/error404");

router.use(userRouter);
router.use(movieRouter);

router.use(auth, (req, res, next) => {
    next(new Error404("Запрашиваемый ресурс не найден"));
});

module.exports = router;
