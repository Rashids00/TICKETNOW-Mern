const Booking = require("../models/Booking")
const Movie = require("../models/Movie")
const User = require("../models/User")
const mongoose = require('mongoose');

const newBooking = async (req, res, next) => {
    const { movie, bookDate, seatNo, user, showTime } = req.body;

    let existingMovie, existingUser;

    try {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }

    if (!existingMovie) {
        return res.status(404).json({ message: "Movie not found" });
    }

    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }
    
    let booking;

    try {
         booking = new Booking({
            movie,
            bookDate: new Date(`${bookDate}`),
            showTime,
            seatNo,
            user,
        });

        const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);
        await existingUser.save({ session });
        await existingMovie.save({ session });
        await booking.save({ session });
        session.commitTransaction();

    } catch (err) {
        return console.log(err);
    }

    if (!booking) {
        return res.status(500).json({ message: "Unable to book" });
    }

    return res.status(201).json({ booking })
};

module.exports = newBooking;