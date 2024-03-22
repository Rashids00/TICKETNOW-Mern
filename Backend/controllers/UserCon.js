const User = require("../models/User")
const Booking = require("../models/Booking")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


const signup = async (req, res, next) => {

    const { email, password } = req.body;
    if (
        !email && email.trim() === "" &&
        !password && password.trim() === "") {
        return res.status(422).json({ message: "Invalid Credentials!" });
    }
    const encPassword = bcrypt.hashSync(password);
    let user;
    try {
        user = new User({ email, password: encPassword });
        await user.save();
    } catch (err) {
        return console.log(err);
    }
    if (!user) {
        return res.status(500).json({ message: "Unexpected Error Occured!" });
    }
    return res.status(201).json({ user });
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ message: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, {
            expiresIn: "3h",
        });

        return res.status(200).json({ message: "Login successful", token, id: existingUser._id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const logout = async (req, res, next) => {
    
  const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - Token not provided" });
    }

    return res.status(200).json({ message: "Logout Successful" });
};

const getBookings = async(req,res,next) => {
    const id = req.params.id;
    let bookings;
    try {
        bookings = await Booking.find({ user: id }).populate('movie');
    } catch(err) {
        return console.log(err);
    }

    if(!bookings) {
        return res.status(500).json({message: "Unable to find bookings"});
    }
    return res.status(200).json({ bookings });
}

module.exports = {
    signup,
    login,
    logout,
    getBookings
};

