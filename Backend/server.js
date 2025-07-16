const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const complaintRouter = require("./routes/complaintRouter");
const profileRouter = require("./routes/profile");

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

 