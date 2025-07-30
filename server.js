const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

// 🔗 IMPORT ROUTES
const authRoutes = require("./routes/authRoutes"); // 🔒 Auth
const productRoutes = require("./Product/routes/product.routes"); // 🪑 Product

// 🛣️ USE ROUTES
app.use("/api/auth", authRoutes);         // Existing route for Register/Login
app.use("/api/products", productRoutes);  // New route for Products

// ✅ HOME ROUTE (optional)
app.get("/", (req, res) => {
  res.send("✅ Welcome to Furniture API");
});

// 🟢 START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
