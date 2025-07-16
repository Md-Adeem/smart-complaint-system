const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require('../models/otp'); // ✅ NEW: OTP Model
const { validateSignUpData } = require('../utils/validation');
const sendEmail = require('../utils/sendEmail');

const authRouter = express.Router();

// -------------------- Send OTP Route --------------------
authRouter.post("/send-otp", async (req, res) => {
  const { emailId } = req.body;
  if (!emailId) return res.status(400).json({ error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 minutes

  try {
    // Delete existing OTPs for this email
    await Otp.deleteMany({ emailId });
    

    // Save new OTP
    await Otp.create({ emailId, otp, expiresAt });
console.log(otp)
    // Send OTP via emailn 
    await sendEmail(emailId, otp);
    console.log("after sendEmail " , emailId)

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP sending error:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// -------------------- Verify OTP Route --------------------
authRouter.post("/verify-otp", async (req, res) => {
  const { emailId, otp } = req.body;

  try {
    const record = await Otp.findOne({ emailId });

    if (!record) return res.status(400).json({ error: "OTP not found" });
    if (new Date() > record.expiresAt) {
      await Otp.deleteOne({ emailId });
      return res.status(400).json({ error: "OTP expired" });
    }
    if (record.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

    await Otp.deleteOne({ emailId }); // OTP verified, delete it
    res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -------------------- Signup Route --------------------
authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, role, department } = req.body;
    validateSignUpData(req);

    const emailLower = emailId.toLowerCase();

    if (!firstName || !lastName || !emailId || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (role === "student" && !emailLower.endsWith("@student.iul.ac.in")) {
      return res.status(403).json({ message: "Invalid student email domain" });
    }

    if (role === "faculty") {
      if (!emailLower.endsWith("@iul.ac.in") || emailLower.endsWith("@student.iul.ac.in")) {
        return res.status(403).json({ message: "Invalid faculty email domain" });
      }
    }

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      role,
      department
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "8h"
    });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(201).json({ message: "User added successfully", data: savedUser });

  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -------------------- Login Route --------------------
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) throw new Error("Invalid Credentials");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid Credentials");

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "8h"
    });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json(user);

  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// -------------------- Logout Route --------------------
authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfully");
});

module.exports = authRouter;

