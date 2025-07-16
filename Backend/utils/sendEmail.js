const nodemailer = require("nodemailer");

const sendEmail = async (to, otp) => {
  try {
    console.log("Sending OTP to:", to);
    console.log("GMAIL_USER:", process.env.GMAIL_USER);
    console.log("GMAIL_PASS:", process.env.GMAIL_PASS ? "Set (" + process.env.GMAIL_PASS.length + " chars)" : "Not set");
    
    // Create transporter inside the function after env vars are loaded
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Smart Complaint System" <${process.env.GMAIL_USER}>`,
      to,
      subject: "Your OTP for Signup",
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ OTP Email sent!");
  } catch (err) {
    console.error("❌ Error while sending email:", err);
    throw err;
  }
};

module.exports = sendEmail;
