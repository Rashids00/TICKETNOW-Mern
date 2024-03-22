const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Types.ObjectId,
        ref: "Movie"
    },
    bookDate: {
        type: Date
    },
    seatNo: {
        type: String,
        unique: true
    },
    showTime: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})
module.exports = mongoose.model("Booking", bookingSchema);