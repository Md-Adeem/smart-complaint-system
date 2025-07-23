const mongoose = require('mongoose');

const otpVerifiedSchema = new mongoose.Schema({
  emailId: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model('OtpVerified', otpVerifiedSchema); 