const express = require("express");
const router = express.Router();
const newBooking = require("../controllers/BookingCon")

router.post("/booking", newBooking);

module.exports = router;