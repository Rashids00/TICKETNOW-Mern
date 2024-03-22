const express = require("express");
const router = express.Router();
const {adminSignup, adminLogin, adminLogout} = require("../controllers/AdminCon")

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);

module.exports = router;