const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const complaintRouter = require("./routes/complaintRouter");
const profileRouter = require("./routes/profile");
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173","https://localhost:5174","https://smart-complaint-system.vercel.app"], // frontend origin
  credentials: true
}));

// Global rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests. Please wait before trying again.',
      status: 429
    });
  }
});
app.use(limiter);

app.use("/", authRouter); 
app.use("/complaints", complaintRouter);
app.use("/", profileRouter);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB Atlas");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// Start server
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});

 