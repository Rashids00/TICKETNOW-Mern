const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSignup = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ message: "Email and password are required" });
        }

        let existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const encPassword = bcrypt.hashSync(password);
        const admin = new Admin({ email, password: encPassword });
        await admin.save();

        return res.status(201).json({ message: "Admin created successfully", admin });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ message: "Email and password are required" });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (!existingAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
            expiresIn: "7d",
        });

        return res.status(200).json({ message: "Login successful", token, id: existingAdmin._id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const adminLogout = async (req, res, next) => {
    
    const token = req.headers.authorization;
      if (!token) {
          return res.status(401).json({ message: "Unauthorized - Token not provided" });
      }
  
      return res.status(200).json({ message: "Logout Successful" });
  };

module.exports = {
    adminSignup,
    adminLogin,
    adminLogout
};
