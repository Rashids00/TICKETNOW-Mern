const Movie = require("../models/Movie")
const Upcoming = require("../models/Upcoming")
const jwt = require("jsonwebtoken");

const formatDate = (date) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
};

const handleToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(404).json({ message: "Token Required" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decrypt) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` });
        } else {
            req.adminId = decrypt.id;
            next();
        }
    });
};

const errorHandler = (err, req, res, next) => {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
};

const addMovie = async (req, res, next) => {

    const { title, description, releaseDate, poster, actors } = req.body;
    if (title.trim() === "" &&
        description.trim() === "" &&
        poster.trim() === "" &&
        actors.trim() === "" &&
        releaseDate.trim() === ""
    )
        return res.status(422).json({ message: "Fill all the fields" });

        try {
            const date = formatDate(new Date(releaseDate));
            const movie = new Movie({ title, description, releaseDate: date, poster, actors });
            await movie.save();
            return res.status(201).json({ message: "Successfully Added" });
        } catch (err) {
            return next(err);
        }
    };

const addUpcomingMovie = async (req, res) => {
  
    const { upcomingPoster, upcomingTitle, releaseDate } = req.body;
    if (!upcomingPoster && upcomingPoster.trim() === "" &&
        !upcomingTitle && upcomingTitle.trim() === "" &&
        !releaseDate && releaseDate.trim() ===""
    )
        return res.status(422).json({ message: "Fill all the fields" });

        try {
            const upcoming = new Upcoming({ releaseDate, upcomingPoster, upcomingTitle });
            await upcoming.save();
            return res.status(201).json({ message: "Successfully Added" });
        } catch (err) {
            return next(err);
        }
    };

const editMovie = async (req, res, next) => {

    const { title, description, releaseDate, poster, actors } = req.body;
    const movieId = req.params.id;

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        movie.title = title,
        movie.description = description,
        movie.releaseDate = releaseDate, 
        movie.poster = poster, 
        movie.actors = actors, 

        await movie.save();
        return res.status(200).json({ message: "Movie updated successfully", movie });
    } catch (err) {
        return next(err);
    }
};

const deleteMovie = async (req, res, next) => {

    const movieId = req.params.id;

    try {
        const movie = await Movie.findByIdAndDelete(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(200).json({ message: "Movie deleted successfully" });
    } catch (err) {
        return next(err);
    }
};

const disableMovie = async (req, res, next) => {

    const movieId = req.params.id;

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        movie.disabled = true;
        await movie.save();
        return res.status(200).json({ message: "Movie disabled successfully", movie });
    } catch (err) {
        return next(err);
    }
};

const enableMovie = async (req, res, next) => {

    const movieId = req.params.id;

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        movie.disabled = false;
        await movie.save();
        return res.status(200).json({ message: "Movie enabled successfully", movie });
    } catch (err) {
        return next(err);
    }
};

const listMovies = async (req, res, next) => {

    try {
        const movies = await Movie.find();
        const formattedMovies = movies.map(movie => ({
            ...movie._doc,
            releaseDate: formatDate(movie.releaseDate)
        }));
        return res.status(200).json( formattedMovies );
    } catch (err) {
        return next(err);
    }
};

const listUpcoming = async (req, res, next) => {

    try {
        const upcoming = await Upcoming.find();
        return res.status(200).json( upcoming );
    } catch (err) {
        return next(err);
    }
};

const getMovie = async (req, res, next) => {

    const id = req.params.id;
    try {
        const movie = await Movie.findById(id);
        
        if (!movie) {
            return res.status(404).json({ message: "Movie not Found" });
        }
        const formattedMovie = {
            ...movie._doc,
            releaseDate: formatDate(movie.releaseDate)
        };
        return res.status(200).json( formattedMovie );
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    addMovie,
    editMovie,
    deleteMovie,
    disableMovie,
    listMovies,
    getMovie,
    addUpcomingMovie,
    listUpcoming,
    handleToken,
    errorHandler,
    enableMovie
};