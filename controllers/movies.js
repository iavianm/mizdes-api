const Movie = require("../models/movie");
const Error404 = require("../errors/error404");
const Error403 = require("../errors/error403");
const {
    movieNotCreate,
    movieNotDelete,
    movieIdNotFound,
    movieDelete,
} = require("../locales/messages");

const getMovies = async (req, res, next) => {
    const owner = req.user._id;
    try {
        const movies = await Movie.find({ owner });
        res.send(movies);
    } catch (err) {
        next(err);
    }
};

const createMovie = async (req, res, next) => {
    try {
        const {
            country, director, duration, year, description,
            image, trailerLink, nameRU, nameEN, thumbnail, movieId,
        } = req.body;

        const movie = await Movie.create({
            owner: req.user._id,
            country,
            director,
            duration,
            year,
            description,
            image,
            trailerLink,
            nameRU,
            nameEN,
            thumbnail,
            movieId,
        });
        if (!movie) {
            throw new Error404(movieNotCreate);
        } else {
            res.status(201).send(movie);
        }
    } catch (err) {
        next(err);
    }
};

const deleteMovie = async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const userId = req.user._id;

        const movie = await Movie.findById(movieId);

        if (!movie) {
            throw new Error404(movieIdNotFound);
        }

        if (movie.owner.toString() !== userId) {
            throw new Error403(movieNotDelete);
        }

        await movie.deleteOne();

        res.send({ message: movieDelete });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getMovies,
    createMovie,
    deleteMovie,
};
