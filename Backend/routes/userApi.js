const express = require("express");
const {signup, login, getBookings, logout} = require("../controllers/UserCon")
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getbookings/:id", getBookings);

module.exports = router;