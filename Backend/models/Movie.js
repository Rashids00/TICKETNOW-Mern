const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    releaseDate: {
        type: Date
    },
    poster: {
        type: String
    },
    bookings: [{
        type: mongoose.Types.ObjectId,
        ref: "Booking",
    }],
    actors: {
        type: String
    },
    disabled: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model("Movie", movieSchema);