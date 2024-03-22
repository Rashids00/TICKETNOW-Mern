const express = require("express");
const router = express.Router();
const {addMovie, listMovies, getMovie, editMovie, deleteMovie, disableMovie, addUpcomingMovie, listUpcoming, handleToken, enableMovie } = require("../controllers/MovieCon")

router.post("/movies/add", handleToken, addMovie);
router.post("/movies/addupcoming", handleToken, addUpcomingMovie);
router.get("/movies", listMovies);
router.get("/upcoming", listUpcoming);
router.get("/movies/:id", getMovie);
router.put("/movies/edit/:id", handleToken, editMovie);
router.delete("/movies/delete/:id", handleToken, deleteMovie);
router.put("/movies/disable/:id", handleToken, disableMovie);
router.put("/movies/enable/:id", handleToken, enableMovie);


module.exports = router;