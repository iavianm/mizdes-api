const express = require("express");
const { celebrate } = require("celebrate");
const auth = require("../middlewares/auth");

const router = express.Router();
const {
    getMovies,
    createMovie,
    deleteMovie,
} = require("../controllers/movies");
const {
    movieBody,
    movieId,
} = require("../utils/joiSchemes");

router.get("/movies", auth, getMovies);
router.post("/movies", auth, celebrate(movieBody), createMovie);
router.delete("/movies/:movieId", auth, celebrate(movieId), deleteMovie);

module.exports = router;
