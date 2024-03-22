const mongoose = require("mongoose")

const upcomingSchema = new mongoose.Schema({
    
    releaseDate: {
        type: Date
    },
    upcomingPoster: {
        type: String
    },
    upcomingTitle: {
        type: String
    }
})
module.exports = mongoose.model("Upcoming", upcomingSchema);