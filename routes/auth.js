const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const OTP_STORAGE = {}; // Temporary storage for OTPs

// 📌 1️⃣ Send OTP via Email
router.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    OTP_STORAGE[email] = otp;

    // Send OTP via Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL, // Your email
            pass: process.env.PASSWORD, // Your email password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP for login is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) return res.status(500).json({ error: "Failed to send OTP" });
        res.json({ message: "OTP sent successfully" });
    });
});

// 📌 2️⃣ Verify OTP and Authenticate
router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    if (OTP_STORAGE[email] !== Number(otp)) {
        return res.status(400).json({ error: "Invalid OTP" });
    }

    let user = await User.findOne({ email });

    // If new user, ask for name & username
    if (!user) {
        return res.json({ newUser: true });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user });
});

// 📌 3️⃣ Save Admin Details After OTP Verification
router.post("/save-admin", async (req, res) => {
    const { email, name, username } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Save new user if username is available
        let user = new User({ email, name, username });
        await user.save();

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, user });

    } catch (error) {
        console.error("Error saving admin:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
