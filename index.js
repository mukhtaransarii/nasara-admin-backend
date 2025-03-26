require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const productRoutes = require("./routes/productRoutes.js");
const nasaraRoutes = require("./routes/nasara.js");
const statusRoutes = require("./routes/status.js");
const authRoutes = require("./routes/auth.js");

// 🔹 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// 🔹 Routes
app.use("/api", productRoutes);
app.use("/nasara", nasaraRoutes);
app.use("/status", statusRoutes);
app.use("/auth", authRoutes);

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
